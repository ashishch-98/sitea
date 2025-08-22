import type { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import http from 'http';
import config from 'temp/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query;

  if (!path || (Array.isArray(path) && path.length === 0)) {
    res.status(400).send('Image path is required');
    return;
  }

  const mediaPath = Array.isArray(path) ? path.join('/') : path;
  const queryIdx = req.url?.indexOf('?') ?? -1;
  const queryString = queryIdx >= 0 ? req.url?.substring(queryIdx) : '';
  const imageUrl = `${config.sitecoreApiHost}/-/${mediaPath}${queryString ?? ''}`;

  const client = imageUrl.startsWith('https') ? https : http;

  const request = client.get(imageUrl, (sitecoreRes) => {
    if (sitecoreRes.statusCode !== 200) {
      res
        .status(sitecoreRes.statusCode ?? 500)
        .send(`Failed to fetch image: ${sitecoreRes.statusCode}`);
      return;
    }

    const contentType = sitecoreRes.headers['content-type'] || '';
    if (!contentType.startsWith('image')) {
      res.status(400).send('Requested resource is not an image.');
      return;
    }

    res.setHeader('Content-Type', contentType);
    if (sitecoreRes.headers['cache-control']) {
      res.setHeader('Cache-Control', sitecoreRes.headers['cache-control']);
    }

    sitecoreRes.pipe(res);

    sitecoreRes.on('end', () => {
      res.end();
    });

    sitecoreRes.on('error', (err) => {
      console.error('Error streaming image from Sitecore:', err);
      if (!res.writableEnded) {
        res.status(500).send('Error streaming image.');
      }
    });
  });

  request.on('error', (err) => {
    console.error('Error fetching image from Sitecore:', err);
    if (!res.writableEnded) {
      res.status(500).send('Error fetching image from Sitecore.');
    }
  });

  req.on('close', () => {
    request.destroy();
  });
}
