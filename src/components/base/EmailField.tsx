import React, { useState, useEffect } from 'react';
import type { FieldWithValueProps } from '@sitecore-jss/sitecore-jss-react-forms';

interface EmailFieldProps extends FieldWithValueProps {
  showErrors?: boolean; // new external prop to show errors forcefully
}

const EmailField: React.FC<EmailFieldProps> = ({
  value,
  onChange,
  errors,
  field,
  isValid,
  showErrors = false, // <-- default false
}) => {
  const inputName = field.valueField?.name || '';
  const [localValue, setLocalValue] = useState((value as string) || '');
  const [localError, setLocalError] = useState<string | null>(null);

  const emailRegex = React.useMemo(() => {
    try {
      const regexValidator = field.model.validationDataModels.find((v) =>
        v.name.toLowerCase().includes('expression')
      );
      if (!regexValidator) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const params = JSON.parse(regexValidator.parameters);
      return new RegExp(params.regularExpression);
    } catch {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    }
  }, [field]);

  useEffect(() => {
    setLocalValue((value as string) || '');
  }, [value]);

  const validateEmail = (email: string) => {
    if (!email && field.model.required) {
      return `${field.model.title || 'Email'} is required`;
    }
    if (email && !emailRegex.test(email)) {
      return errors?.[0] || `${field.model.title || 'Email'} is invalid`;
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    const validationError = validateEmail(newValue);
    setLocalError(validationError);

    onChange(
      inputName,
      newValue,
      validationError === null,
      validationError ? [validationError] : []
    );
  };

  const showErrorMessages = localError !== null || (showErrors && !isValid);

  return (
    <div className="form-group">
      <label htmlFor={inputName}>{field.model?.title || 'Email'}</label>
      <input
        type="email"
        id={inputName}
        name={inputName}
        value={localValue}
        placeholder={field.model?.placeholderText || 'Your email'}
        onChange={handleChange}
        className={`input ${showErrorMessages ? 'input-error' : ''}`}
      />
      {showErrorMessages && (
        <ul className="error-messages" role="alert">
          {(localError ? [localError] : errors).map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmailField;
