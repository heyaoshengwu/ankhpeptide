import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: [
    'en', 'zh', 'zh-TW', 'ja', 'ko', 'es', 'de', 'fr', 'nl',
    'ar', 'tr', 'fa', 'vi', 'th', 'ms', 'id', 'tl'
  ],
  defaultLocale: 'en',
  localePrefix: 'always'
});
