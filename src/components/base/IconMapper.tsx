import { DropLinkField } from 'lib/types';
import React, { JSX } from 'react';
import { FaVideo, FaSquarespace, FaFigma, FaAffiliatetheme, FaGripfire } from 'react-icons/fa';

interface IconMapperProps {
  iconItem: DropLinkField | null | undefined;
  className?: string;
}

const iconMap: Record<string, JSX.Element> = {
  figma: <FaFigma />,
  video: <FaVideo />,
  squareSpace: <FaSquarespace color="blue" />,
  affiliateTheme: <FaAffiliatetheme />,
  gripFire: <FaGripfire />,
};

const IconMapper: React.FC<IconMapperProps> = ({ iconItem, className }) => {
  if (!iconItem || !iconItem.fields?.name?.value) {
    return null;
  }

  const key = iconItem?.fields?.name?.value;

  const IconComponent = iconMap[key];

  if (!IconComponent) {
    return null;
  }

  return <span className={`w-5 h-5 mr-2 -ml-1 mt-1 ${className}`}>{IconComponent}</span>;
};

export default IconMapper;
