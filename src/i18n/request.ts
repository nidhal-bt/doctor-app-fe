import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { defaultLocale, locales } from './config';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get('locale')?.value ?? defaultLocale;
  const locale = (locales as readonly string[]).includes(raw) ? raw : defaultLocale;

  const namespaces = ['common', 'auth', 'nav', 'doctor', 'patient', 'secretary'] as const;
  const messages: Record<string, unknown> = {};

  for (const ns of namespaces) {
    const mod = await import(`../../messages/${locale}/${ns}.json`);
    messages[ns] = mod.default;
  }

  return { locale, messages };
});
