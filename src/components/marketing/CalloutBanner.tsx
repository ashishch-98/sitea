import { JSX } from 'react';
import {
  RichText,
  ImageField,
  Field,
  LinkField,
  Text,
  Image,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { DropLinkField } from '../../lib/types';
import ButtonLink from 'components/base/ButtonLink';

interface LogoMultiListField {
  fields: {
    logo: ImageField;
  };
}

interface Fields {
  description: Field<string>;
  firstCta: LinkField;
  firstCtaIcon: DropLinkField;
  firstCtaStyle: DropLinkField;
  partnerLogos: LogoMultiListField[];
  partnerTitle: Field<string>;
  secondCta: LinkField;
  secondCtaIcon: DropLinkField;
  secondCtaStyle: DropLinkField;
  title: Field<string>;
}

type CalloutBannerProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const CalloutBannerDefaultComponent = (props: CalloutBannerProps): JSX.Element => (
  <div className={`component callout-banner ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Callout Banner</span>
    </div>
  </div>
);

export const Default = (props: CalloutBannerProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className="callout-component" id={id ? id : undefined}>
        <div>
          <Text
            tag="h2"
            field={props?.fields?.title}
            className="text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white sm:text-5xl"
          />
          <RichText
            tag="p"
            field={props?.fields?.description}
            className="mt-5 text-base font-normal text-gray-500 dark:text-gray-400 md:max-w-3xl sm:text-xl"
          />
        </div>
        <div className="flex flex-col gap-4 mt-8 sm:flex-row">
          <ButtonLink
            btnIcon={props?.fields?.firstCtaIcon}
            field={props?.fields?.firstCta}
            btnType={props?.fields?.firstCtaStyle}
          />
          <ButtonLink
            btnIcon={props?.fields?.secondCtaIcon}
            field={props?.fields?.secondCta}
            btnType={props?.fields?.secondCtaStyle}
          />
        </div>
        <div className="mt-4 sm:border-t sm:border-gray-100 sm:mt-8 sm:pt-8 dark:border-gray-700">
          <Text
            tag="p"
            field={props?.fields?.partnerTitle}
            className="hidden text-base font-medium text-gray-500 sm:block"
          />

          <div className="flex items-center mt-3 max-w-md">
            {props?.fields?.partnerLogos?.map((logo, index) => (
              <Image field={logo?.fields?.logo} className="w-auto h-8 md:h-12 mr-4" key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <CalloutBannerDefaultComponent {...props} />;
};
