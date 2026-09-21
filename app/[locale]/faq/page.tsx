import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { alternates } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternates(locale, '/faq') };
}

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });
  const lp = `/${locale}`;
  const faqs = t.raw('pages.faq.items') as { q: string; a: string }[];

  return (
    <>
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
              {t('footer.faq')}
            </h1>
            <p className="text-lg text-slate-600">
              {t('pages.faq.subtitle')}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-slate-200 pb-6">
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">
                    {faq.q}
                  </h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-slate-50 rounded-lg text-center">
              <p className="text-slate-600 mb-4">
                {t('pages.faq.ctaText')}
              </p>
              <Link href={`${lp}/contact`} className="text-primary-600 font-medium hover:underline">
                {t('pages.faq.contact')}
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}