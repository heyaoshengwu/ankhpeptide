import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { AlertTriangle } from 'lucide-react';
import { alternates } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternates(locale, '/disclaimer') };
}

export default async function DisclaimerPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });
  const lp = `/${locale}`;
  const sections = t.raw('pages.disclaimer.sections') as {
    title: string;
    body: string;
  }[];
  const qualifications = t.raw('pages.disclaimer.qualificationList') as string[];

  return (
    <>
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-yellow-100 rounded-full">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
              {t('footer.disclaimer')}
            </h1>
            <p className="text-lg text-slate-600">
              {t('pages.disclaimer.subtitle')}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-yellow-800 mb-4">
                {t('pages.disclaimer.alertTitle')}
              </h2>
              <p className="text-yellow-700">
                <strong>{t('pages.disclaimer.alertText')}</strong>
              </p>
            </div>

            <div className="prose prose-slate">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                  {index === 2 && (
                    <ul>
                      {qualifications.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-slate-50 rounded-lg text-center">
              <p className="text-slate-600 mb-4">
                {t('pages.disclaimer.ctaText')}
              </p>
              <Link href={`${lp}/contact`} className="text-primary-600 font-medium hover:underline">
                {t('pages.disclaimer.contact')}
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}