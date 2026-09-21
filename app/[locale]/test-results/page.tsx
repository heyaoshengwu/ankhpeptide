import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileCheck, Download, Shield, FlaskConical, Award } from 'lucide-react';
import { alternates, siteUrl, ogLocales } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'testResults' });
  const title = t('title');
  const description = t('subtitle');

  return {
    title,
    description,
    alternates: alternates(locale, '/test-results'),
    openGraph: {
      type: 'website',
      url: siteUrl(`/${locale}/test-results`),
      locale: ogLocales[locale],
      title,
      description,
    },
  };
}

const testResultsData = [
  {
    categoryKey: 'peptides',
    products: [
      { name: 'BPC-157', purity: '99.5%', cas: '137525-51-9', report: 'BPC-157-CO-A-2024.pdf' },
      { name: 'TB-500', purity: '99.2%', cas: '77591-33-4', report: 'TB-500-CO-A-2024.pdf' },
      { name: 'PT-141', purity: '98.9%', cas: '189691-06-3', report: 'PT-141-CO-A-2024.pdf' },
      { name: 'KLOW-17', purity: '99.1%', cas: 'N/A', report: 'KLOW-17-CO-A-2024.pdf' },
    ],
  },
  {
    categoryKey: 'glp1',
    products: [
      { name: 'Semaglutide', purity: '99.4%', cas: '910463-68-3', report: 'Semaglutide-CO-A-2024.pdf' },
      { name: 'Tirzepatide', purity: '99.6%', cas: '2023788-19-2', report: 'Tirzepatide-CO-A-2024.pdf' },
      { name: 'Retatrutide', purity: '98.8%', cas: 'N/A', report: 'Retatrutide-CO-A-2024.pdf' },
    ],
  },
  {
    categoryKey: 'sarms',
    products: [
      { name: 'Ostarine (MK-2866)', purity: '99.3%', cas: '841205-47-8', report: 'Ostarine-CO-A-2024.pdf' },
      { name: 'Ligandrol (LGD-4033)', purity: '99.1%', cas: '1165910-22-4', report: 'LGD4033-CO-A-2024.pdf' },
      { name: 'Cardarine (GW-501516)', purity: '99.7%', cas: '317318-70-0', report: 'Cardarine-CO-A-2024.pdf' },
      { name: 'Ibutamoren (MK-677)', purity: '99.0%', cas: '1598320-39-1', report: 'Ibutamoren-CO-A-2024.pdf' },
    ],
  },
  {
    categoryKey: 'ghAnalogs',
    products: [
      { name: 'CJC-1295', purity: '99.2%', cas: '577752-31-7', report: 'CJC1295-CO-A-2024.pdf' },
      { name: 'Ipamorelin', purity: '99.4%', cas: '170851-18-2', report: 'Ipamorelin-CO-A-2024.pdf' },
      { name: 'GHRP-2', purity: '99.1%', cas: '156657-38-8', report: 'GHRP2-CO-A-2024.pdf' },
      { name: 'GHRP-6', purity: '98.9%', cas: '139180-30-6', report: 'GHRP6-CO-A-2024.pdf' },
    ],
  },
];

export default async function TestResultsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });
  const tCat = await getTranslations({ locale, namespace: 'product.categories' });
  const lp = `/${locale}`;

  const process = [
    { title: t('testResults.proc1.title'), description: t('testResults.proc1.desc') },
    { title: t('testResults.proc2.title'), description: t('testResults.proc2.desc') },
    { title: t('testResults.proc3.title'), description: t('testResults.proc3.desc') },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary-100 rounded-full">
              <FileCheck className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {t('testResults.title')}
            </h1>
            <p className="mb-8 text-lg text-slate-600 max-w-2xl mx-auto">
              {t('testResults.subtitle')}
            </p>
          </div>
        </Container>
      </Section>

      {/* Trust Badge */}
      <Section className="bg-slate-50 py-8">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-slate-700">{t('testResults.badgeVerified')}</span>
            </div>
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-slate-700">{t('testResults.badgeHplc')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-slate-700">{t('testResults.badgePurity')}</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Test Results by Category */}
      <Section className="bg-white">
        <Container>
          <div className="space-y-12">
            {testResultsData.map((category) => (
              <div key={category.categoryKey}>
                <h2 className="text-2xl font-bold mb-6 text-slate-900">
                  {tCat(category.categoryKey)}
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {category.products.map((product) => (
                    <Card key={product.name} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-slate-900">{product.name}</h3>
                            <p className="text-xs text-slate-500">CAS: {product.cas}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Shield className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-700">
                                {product.purity} {t('testResults.purity')}
                              </span>
                            </div>
                          </div>
                          <a href={product.report} target="_blank" rel="noreferrer" download>
                            <Button variant="outline" size="sm" className="w-full gap-2">
                              <Download className="w-4 h-4" />
                              {t('testResults.download')}
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Verification Process */}
      <Section className="bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">{t('testResults.processTitle')}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {process.map((step, index) => (
                <div key={step.title} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="w-10 h-10 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-primary-600 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{t('testResults.ctaTitle')}</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              {t('testResults.ctaDesc')}
            </p>
            <Link href={`${lp}/contact`}>
              <Button size="lg" className="bg-white text-primary-600 hover:bg-slate-100">
                {t('testResults.contactUs')}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}