import { JSX } from 'react';
import { Field, Text, RichText, LinkField, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { DropLinkField } from 'lib/types';
import IconMapper from 'components/base/IconMapper';

interface FeaturesMultiListField {
  fields: {
    icon: DropLinkField;
    link: LinkField;
    title: Field<string>;
  };
}

interface Fields {
  description: Field<string>;
  title: Field<string>;
  titleTag: DropLinkField;
  features: FeaturesMultiListField[];
}

type FeatureSectionProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FeatureSectionDefaultComponent = (props: FeatureSectionProps): JSX.Element => (
  <div className={`component feature-section ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Feature Section</span>
    </div>
  </div>
);

export const Default = (props: FeatureSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    const { fields } = props;
    return (
      <div
        className={`component feature-section ${props?.params?.styles}`}
        id={id ? id : undefined}
      >
        <div className="py-8 mx-auto max-w-screen-xl sm:py-16">
          <Text
            field={fields?.title}
            tag={fields?.titleTag?.fields?.name?.value ?? 'h2'}
            className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
          />

          <RichText
            field={fields?.description}
            className="mb-3 font-light text-gray-500 dark:text-gray-400 sm:text-xl"
          />

          <div className="grid gap-8 lg:grid-cols-2 mt-8">
            {fields?.features?.map((feature, index) => (
              <Link
                key={index}
                field={feature?.fields?.link}
                className="inline-flex justify-center items-center p-5 text-base font-medium text-gray-500 bg-gray-50 rounded-lg hover:text-gray-900 hover:bg-gray-100 hover:no-underline dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <IconMapper iconItem={feature?.fields?.icon} />
                <span className="w-full">{feature?.fields?.link?.value?.text}</span>
                <svg
                  className="ml-3 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <FeatureSectionDefaultComponent {...props} />;
};
