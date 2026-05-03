export const locales = ['en', 'fr', 'ar'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';
const rtlLocales: Locale[] = ['ar'];
export function isRTL(locale: string): boolean {
  return rtlLocales.includes(locale as Locale);
}
