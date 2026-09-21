import { getRequestConfig } from 'next-intl/server';

const supportedLocales = new Set([
  'en', 'zh', 'zh-TW', 'ja', 'ko', 'es', 'de', 'fr', 'nl',
  'ar', 'tr', 'fa', 'vi', 'th', 'ms', 'id', 'tl'
]);

export default getRequestConfig(async ({ requestLocale }) => {
  const raw = (await requestLocale) as string;
  const locale = supportedLocales.has(raw) ? raw : 'en';

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});
