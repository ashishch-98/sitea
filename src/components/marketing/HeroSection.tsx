import { JSX } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const placeholderId = props?.params?.DynamicPlaceholderId;
  const id = props.params.RenderingIdentifier;
  return (
    <div
      className="hero grid grid-cols-1 gap-8 lg:gap-16 lg:grid-cols-2 lg:items-center"
      id={id ? id : undefined}
    >
      <Placeholder name={`hero-col-1-${placeholderId}`} rendering={props.rendering} />
      <Placeholder name={`hero-col-2-${placeholderId}`} rendering={props.rendering} />
    </div>
  );
};

export const SingleColumn = (props: ComponentProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  return (
    <div className="hero grid grid-cols-1 gap-8 lg:gap-16" id={id ? id : undefined}>
      <Placeholder name={`hero-col-1-{*}`} rendering={props.rendering} />
    </div>
  );
};
