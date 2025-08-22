import { DropLinkField } from 'lib/types';

export function getBackgroundClasses(bgStyle: DropLinkField): string {
  if (!bgStyle?.fields?.name?.value) {
    bgStyle = { fields: { name: { value: 'primary' } } };
  }

  const key = bgStyle.fields.name.value;

  const backgroundClassMap: Record<string, string> = {
    primary:
      'p-4 text-primary-700 bg-primary-100 rounded-lg dark:bg-primary-900 dark:text-primary-300',
    teal: 'p-4 text-teal-600 bg-teal-100 rounded-lg dark:bg-teal-900 dark:text-teal-300',
    indigo: 'p-4 text-indigo-700 bg-indigo-100 rounded-lg dark:bg-indigo-900 dark:text-indigo-300',
    purple: 'p-4 text-purple-700 bg-purple-100 rounded-lg dark:bg-purple-900 dark:text-purple-300',
    green: 'p-4 text-green-600 bg-green-100 rounded-lg dark:text-green-300 dark:bg-green-900',
  };

  return backgroundClassMap[key] || backgroundClassMap['primary'];
}
