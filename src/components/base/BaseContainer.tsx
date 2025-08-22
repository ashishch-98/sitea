import React, { ReactNode } from 'react';
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

type ContainerProps = {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
  id?: string;
};

const BaseContainer: React.FC<ContainerProps> = ({
  children,
  fullWidth = false,
  className = '',
  id,
}) => {
  const baseClasses = fullWidth
    ? 'w-full'
    : 'max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24';

  return (
    <section className={`bg-white dark:bg-gray-900 ${className}`} id={id}>
      <div className={`${baseClasses}`}>{children}</div>
    </section>
  );
};

export default BaseContainer;

const DefaultContainer = (props: ComponentProps): JSX.Element => {
  const phKey = `container-${props?.params?.DynamicPlaceholderId}`;
  const id = props?.params?.RenderingIdentifier;
  const isFullWidth = props?.params?.isFullWidth as string;

  const baseClasses = isFullWidth
    ? 'w-full'
    : 'max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24';

  return (
    <section className={`base-container bg-white dark:bg-gray-900`} id={id ? id : undefined}>
      <div className={`${baseClasses}`}>
        <Placeholder name={phKey} rendering={props.rendering} />
      </div>
    </section>
  );
};

export const Default = (props: ComponentProps): JSX.Element => {
  const splitStyles = props.params?.Styles?.split(' ');

  if (splitStyles && splitStyles.includes('container')) {
    return (
      <div className="container-wrapper">
        <DefaultContainer {...props} />
      </div>
    );
  }

  return <DefaultContainer {...props} />;
};
