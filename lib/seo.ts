export const localeCodes = [
  'en', 'zh', 'zh-TW', 'ja', 'ko', 'es', 'de', 'fr', 'nl',
  'ar', 'tr', 'fa', 'vi', 'th', 'ms', 'id', 'tl',
];

const BASE_URL = process.env.SITE_URL || 'https://ankhpeptide.com';

export const ogLocales: Record<string, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  'zh-TW': 'zh_TW',
  ja: 'ja_JP',
  ko: 'ko_KR',
  es: 'es_ES',
  de: 'de_DE',
  fr: 'fr_FR',
  nl: 'nl_NL',
  ar: 'ar_SA',
  tr: 'tr_TR',
  fa: 'fa_IR',
  vi: 'vi_VN',
  th: 'th_TH',
  ms: 'ms_MY',
  id: 'id_ID',
  tl: 'tl_PH',
};

export function siteUrl(path = ''): string {
  return `${BASE_URL}${path}`;
}

export function alternates(locale: string, path = '') {
  const languages: Record<string, string> = { 'x-default': siteUrl(`/en${path}`) };
  for (const l of localeCodes) {
    languages[l] = siteUrl(`/${l}${path}`);
  }
  return {
    canonical: siteUrl(`/${locale}${path}`),
    languages,
  };
}

export const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AnkhPeptide',
  url: siteUrl(),
  logo: siteUrl('/favicon.svg'),
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'sales@ankhpeptide.com',
    contactType: 'sales',
  },
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AnkhPeptide',
  url: siteUrl(),
};