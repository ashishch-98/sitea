import { JSX } from 'react';
import { Field, Text, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { DropLinkField } from 'lib/types';
import { getBackgroundClasses } from 'lib/styles/bg-class-mapper';

interface StatsCardMultiListField {
  fields: {
    backgroundType: DropLinkField;
    subTitle: Field<string>;
    title: Field<string>;
  };
}

interface Fields {
  description: Field<string>;
  title: Field<string>;
  titleTag: DropLinkField;
  statsCards: StatsCardMultiListField[];
}

type StatsSectionProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const StatsSectionDefaultComponent = (props: StatsSectionProps): JSX.Element => (
  <div className={`component stats-section ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Stats Section</span>
    </div>
  </div>
);

export const Default = (props: StatsSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    const { fields } = props;
    return (
      <div
        className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12"
        id={id ? id : undefined}
      >
        <div className="max-w-2xl mx-auto">
          <Text
            field={fields?.title}
            tag={fields?.titleTag?.fields?.name?.value ?? 'h1'}
            className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
          />

          <RichText
            field={fields?.description}
            className="mb-8 text-lg font-normal text-gray-500 lg:mb-12 lg:text-xl dark:text-gray-400"
          />
        </div>
        <div className="grid gap-6 lg:gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {fields?.statsCards?.map((card, index) => (
            <div key={index} className={getBackgroundClasses(card?.fields?.backgroundType)}>
              <Text
                field={card?.fields?.title}
                tag="h2"
                className="text-3xl font-extrabold leading-tight"
              />

              <Text
                field={card?.fields?.subTitle}
                tag="span"
                className="text-primary-500 dark:text-primary-400"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <StatsSectionDefaultComponent {...props} />;
};
