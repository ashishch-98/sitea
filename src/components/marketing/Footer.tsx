import { JSX } from 'react';
import { Field, LinkField, Link, Image, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

interface Fields {
  brandLogo: ImageField;
  copyrightText: Field<string>;
  facebook: LinkField;
  linkedin: LinkField;
  twitter: LinkField;
}

type FooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FooterDefaultComponent = (props: FooterProps): JSX.Element => (
  <div className={`component footer ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Footer Section</span>
    </div>
  </div>
);

export const Default = (props: FooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    const { fields } = props;
    return (
      <footer className="w-full bg-white text-gray-400 py-6" id={id ? id : undefined}>
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 gap-6">
          <div className="flex items-center gap-2">
            <Image field={fields?.brandLogo} width={32} height={32} className="rounded" />
          </div>
          <p className="text-sm text-center sm:text-left">
            © {new Date().getFullYear()} {fields?.copyrightText?.value}
          </p>
          <div className="flex gap-4">
            <Link field={fields?.twitter} className="hover:text-white">
              <FaTwitter />
            </Link>
            <Link field={fields?.facebook} className="hover:text-white">
              <FaFacebookF />
            </Link>
            <Link field={fields?.linkedin} className="hover:text-white">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  return <FooterDefaultComponent {...props} />;
};
