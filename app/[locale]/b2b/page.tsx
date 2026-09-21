import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Globe, Building2, FlaskConical, Truck, Package, ArrowRight, CheckCircle } from 'lucide-react';
import { alternates, siteUrl, ogLocales } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'b2b' });
  const title = t('title');
  const description = t('subtitle');

  return {
    title,
    description,
    alternates: alternates(locale, '/b2b'),
    openGraph: {
      type: 'website',
      url: siteUrl(`/${locale}/b2b`),
      locale: ogLocales[locale],
      title,
      description,
    },
  };
}

export default async function B2BPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });
  const lp = `/${locale}`;

  const services = [
    { icon: Package, title: t('b2b.svBulk.title'), description: t('b2b.svBulk.desc') },
    { icon: FlaskConical, title: t('b2b.svCustom.title'), description: t('b2b.svCustom.desc') },
    { icon: Truck, title: t('b2b.svChain.title'), description: t('b2b.svChain.desc') },
    { icon: Building2, title: t('b2b.svPartner.title'), description: t('b2b.svPartner.desc') },
  ];

  const benefits = [
    t('b2b.ben0'),
    t('b2b.ben1'),
    t('b2b.ben2'),
    t('b2b.ben3'),
    t('b2b.ben4'),
    t('b2b.ben5'),
    t('b2b.ben6'),
  ];

  const markets = [
    { icon: Globe, title: t('b2b.mktInstitutions.title'), description: t('b2b.mktInstitutions.desc') },
    { icon: Building2, title: t('b2b.mktPharma.title'), description: t('b2b.mktPharma.desc') },
    { icon: FlaskConical, title: t('b2b.mktCRO.title'), description: t('b2b.mktCRO.desc') },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary-100 rounded-full">
              <Building2 className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {t('b2b.title')}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('b2b.subtitle')}
            </p>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('b2b.servicesTitle')}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Card key={service.title}>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-slate-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section className="bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold mb-6">{t('b2b.benefitsTitle')}</h2>
                <ul className="space-y-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-4">{t('b2b.customTitle')}</h3>
                <p className="text-slate-600 mb-6">
                  {t('b2b.customDesc')}
                </p>
                <Link href={`${lp}/contact`}>
                  <Button className="w-full gap-2">
                    {t('b2b.contactQuote')}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Target Markets */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('b2b.serveTitle')}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t('b2b.serveDesc')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {markets.map((market) => (
              <Card key={market.title} className="text-center">
                <CardContent className="pt-6">
                  <market.icon className="w-10 h-10 mx-auto mb-4 text-primary-600" />
                  <h3 className="font-semibold mb-2">{market.title}</h3>
                  <p className="text-sm text-slate-600">
                    {market.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-primary-600 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{t('b2b.contact')}</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              {t('b2b.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`${lp}/contact`}>
                <Button size="lg" className="bg-white text-primary-600 hover:bg-slate-100">
                  {t('b2b.getInTouch')}
                </Button>
              </Link>
              <Link href={`${lp}/products`}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                  {t('b2b.browseCatalog')}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}