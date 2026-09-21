import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, Clock, Globe, FlaskConical } from 'lucide-react';
import { alternates, siteUrl, ogLocales } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const title = t('missionTitle');
  const description = t('content');

  return {
    title,
    description,
    alternates: alternates(locale, '/about'),
    openGraph: {
      type: 'website',
      url: siteUrl(`/${locale}/about`),
      locale: ogLocales[locale],
      title,
      description,
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });
  const lp = `/${locale}`;

  const stats = [
    { value: '99%+', label: t('about.stats.purity') },
    { value: '50+', label: t('about.stats.countries') },
    { value: '500+', label: t('about.stats.products') },
    { value: '24h', label: t('about.stats.response') },
  ];

  const values = [
    { icon: Shield, title: t('about.valQA.title'), description: t('about.valQA.desc') },
    { icon: Award, title: t('about.valISO.title'), description: t('about.valISO.desc') },
    { icon: Globe, title: t('about.valGlobal.title'), description: t('about.valGlobal.desc') },
    { icon: Clock, title: t('about.valService.title'), description: t('about.valService.desc') },
  ];

  const process = [
    { title: t('about.proc1.title'), description: t('about.proc1.desc') },
    { title: t('about.proc2.title'), description: t('about.proc2.desc') },
    { title: t('about.proc3.title'), description: t('about.proc3.desc') },
    { title: t('about.proc4.title'), description: t('about.proc4.desc') },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary-100 rounded-full">
              <FlaskConical className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {t('about.title')}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('about.content')}
            </p>
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section className="bg-primary-600 text-white">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{t('about.missionTitle')}</h2>
            <p className="text-lg text-slate-600 mb-8">
              {t('about.mission')}
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2 text-slate-900">{t('about.forResearchers')}</h3>
                  <p className="text-sm text-slate-600">
                    {t('about.forResearchersDesc')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2 text-slate-900">{t('about.forLaboratories')}</h3>
                  <p className="text-sm text-slate-600">
                    {t('about.forLaboratoriesDesc')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section className="bg-slate-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('about.whyTitle')}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Quality Process */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('about.processTitle')}</h2>
            <div className="space-y-6">
              {process.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-slate-900 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{t('about.ctaTitle')}</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              {t('about.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`${lp}/products`}>
                <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                  {t('hero.viewProducts')}
                </Button>
              </Link>
              <Link href={`${lp}/contact`}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                  {t('about.contactUs')}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}