import { locales } from 'lib/constants';
import { useRouter } from 'next/router';
import React from 'react';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale: currentLocale, asPath } = router;

  const availableLanguages = locales;

  const changeLanguage = (newLocale: string) => {
    router.push(asPath, asPath, { locale: newLocale });
  };

  const nativeLanguageNames: Record<string, string> = {
    en: 'English',
    es: 'Español',
  };

  return (
    <div>
      <select
        aria-label="Select language"
        onChange={(e) => changeLanguage(e.target.value)}
        value={currentLocale}
        className="px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-black"
      >
        {availableLanguages.map((lang) => {
          const languageCode = lang.split('-')[0];
          const nativeName = nativeLanguageNames[languageCode] || languageCode.toUpperCase();

          return (
            <option key={lang} value={lang} className="bg-white text-black">
              {nativeName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
