import { Link, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import IconMapper from './IconMapper';
import { DropLinkField } from 'lib/types';

interface ButtonLinkProps {
  field: LinkField;
  btnIcon: DropLinkField;
  btnType?: DropLinkField;
  className?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ field, btnType, btnIcon, className = '' }) => {
  if (!field?.value?.href) {
    return null;
  }

  const btnStyle =
    btnType?.fields?.name?.value?.toLowerCase() === 'secondary' ? 'secondary' : 'primary';

  const baseStyles =
    'sm:w-[182px] px-5 py-3 w-full text-base font-medium text-center rounded-lg shrink-0 focus:outline-none focus:ring-4 flex items-center justify-center';

  const styles = {
    primary:
      'text-white bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800',
    secondary:
      'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:ring-gray-200 focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700',
  };

  const combinedClassName = `${baseStyles} ${styles[btnStyle]} ${className}`.trim();

  return (
    <Link field={field} className={combinedClassName}>
      {btnIcon?.fields?.name?.value && <IconMapper iconItem={btnIcon} />}
      {field?.value?.text && <span>{field.value.text}</span>}
    </Link>
  );
};

export default ButtonLink;
