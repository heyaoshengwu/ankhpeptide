import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // 默认语言设置为 'en'，根据你的项目需求调整
  let locale = await requestLocale;

  // 校验语言列表，防止无效值
  if (!locale || !['en', 'zh'].includes(locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
