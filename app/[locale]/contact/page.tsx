import { InquiryForm } from '@/components/forms/inquiry-form';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { alternates, siteUrl, ogLocales } from '@/lib/seo';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const title = t('title');
  const description = t('subtitle');

  return {
    title,
    description,
    alternates: alternates(locale, '/contact'),
    openGraph: {
      type: 'website',
      url: siteUrl(`/${locale}/contact`),
      locale: ogLocales[locale],
      title,
      description,
    },
  };
}

export default async function ContactPage({
  params,
}: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('lead')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t('sendInquiry')}
            </h2>
            <InquiryForm />
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('info')}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('email')}</p>
                  <p className="text-gray-900">sales@ankhpeptide.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('responseTime')}
              </h3>
              <p className="text-gray-600">
                {t('responseText')}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('bulkOrders')}
              </h3>
              <p className="text-gray-600">
                {t('bulkText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}