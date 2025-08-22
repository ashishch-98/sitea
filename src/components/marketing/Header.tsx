import { JSX, useState } from 'react';
import { Field, Text, LinkField, Link, Image, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { FiMenu, FiX } from 'react-icons/fi';
import LanguageSwitcher from 'components/base/LanguageSwitcher';

interface MenuItemsMultiListField {
  fields: {
    Link: LinkField;
  };
}

interface Fields {
  brandLogo: ImageField;
  personalizedMessage: Field<string>;
  menuItems: MenuItemsMultiListField[];
}

type HeaderProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HeaderDefaultComponent = (props: HeaderProps): JSX.Element => (
  <div className={`component header ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Header Section</span>
    </div>
  </div>
);

export const Default = (props: HeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [isOpen, setIsOpen] = useState(false);
  if (props.fields) {
    const { fields } = props;
    return (
      <div className="w-full bg-white" id={id ? id : undefined}>
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Image field={fields?.brandLogo} width={120} height={40} className="rounded-full" />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
            {fields?.menuItems.map((item, index) => (
              <Link
                key={index}
                field={item?.fields?.Link}
                className="hover:text-blue-600 transition-colors"
              />
            ))}
          </nav>

          {/* Personalized Message Placeholder */}
          <Text
            tag="p"
            field={fields?.personalizedMessage}
            className="hidden md:block text-sm text-gray-500 italic"
          />

          <LanguageSwitcher />

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-inner px-6 py-4 space-y-4">
            {fields?.menuItems.map((item, index) => (
              <Link
                key={index}
                field={item?.fields?.Link}
                className="block text-gray-700 font-medium hover:text-blue-600 transition-colors"
              />
            ))}

            <Text
              field={fields?.personalizedMessage}
              tag="p"
              className="text-sm text-gray-500 italic"
            />
          </div>
        )}
      </div>
    );
  }

  return <HeaderDefaultComponent {...props} />;
};
