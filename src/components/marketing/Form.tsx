import React, { useState } from 'react';
import type { NextRouter } from 'next/router';
import { Form } from '@sitecore-jss/sitecore-jss-react-forms';
import { sitecoreApiKey } from 'temp/config';
// import EmailField from 'components/base/EmailField';
import { useI18n } from 'next-localization';

// const defaultFieldFactory = createDefaultFieldFactory();
// defaultFieldFactory.setComponent(FieldTypes.Email, EmailField);

const JssNextForm = ({ fields, router }: { fields: unknown; router: NextRouter }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleRedirect = () => setSubmitted(true);
  const { t } = useI18n();

  if (submitted) {
    return (
      <div className="text-teal-600 bg-teal-100 dark:bg-teal-900 dark:text-teal-300text-lg font-semibold rounded-md px-6 py-4 shadow-lg max-w-md mx-auto my-6 text-center">
        {t('Form Success Submit Message')}
      </div>
    );
  }

  return (
    <Form
      language={router?.locale}
      // fieldFactory={defaultFieldFactory}
      form={fields}
      sitecoreApiHost={''}
      sitecoreApiKey={sitecoreApiKey}
      onRedirect={handleRedirect}
      className="max-w-sm mx-auto"
    />
  );
};

export default JssNextForm;
