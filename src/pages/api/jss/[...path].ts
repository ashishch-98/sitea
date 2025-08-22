import type { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import config from 'temp/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path = [] } = req.query;
  const pathArray = Array.isArray(path) ? path : [path];

  const queryString = req.url?.includes('?') ? req.url.split('?')[1] : '';
  const targetUrl = `${config.sitecoreApiHost}/api/jss/${pathArray.join('/')}${
    queryString ? `?${queryString}` : ''
  }`;

  const agent = new https.Agent({ rejectUnauthorized: false });

  const sanitizedHeaders = Object.entries(req.headers || {})
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => {
      acc[key] = value as string;
      return acc;
    }, {} as Record<string, string>);

  const options: RequestInit = {
    method: req.method,
    headers: sanitizedHeaders,
    body: ['GET', 'HEAD'].includes(req.method || '') ? undefined : req.body,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    agent,
  };

  try {
    const fetchResponse = await fetch(targetUrl, options);

    const buffer = await fetchResponse.arrayBuffer();

    fetchResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.status(fetchResponse.status).send(Buffer.from(buffer));
  } catch (error) {
    res.status(500).json({ error: `Proxy request failed: ${error}` });
  }
}
