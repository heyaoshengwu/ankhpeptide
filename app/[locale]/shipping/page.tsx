import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Clock, Shield, Thermometer } from 'lucide-react';
import { alternates } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternates(locale, '/shipping') };
}

const shippingIcons = [Truck, Clock, Shield, Thermometer];

export default async function ShippingPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });
  const cards = t.raw('pages.shipping.cards') as {
    title: string;
    description: string;
  }[];

  return (
    <>
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
              {t('footer.shipping')}
            </h1>
            <p className="text-lg text-slate-600">
              {t('pages.shipping.subtitle')}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2 mb-12">
              {cards.map((info, index) => {
                const Icon = shippingIcons[index % shippingIcons.length];
                return (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          <p className="text-sm text-slate-600">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-bold mb-4">{t('pages.shipping.costsTitle')}</h2>
              <p className="text-slate-600 mb-4">
                {t('pages.shipping.costsText1')}
              </p>
              <p className="text-slate-600">
                {t('pages.shipping.costsText2')}
              </p>
            </div>

            <div className="border-t border-slate-200 pt-8 mt-8">
              <h2 className="text-xl font-bold mb-4">{t('pages.shipping.processingTitle')}</h2>
              <p className="text-slate-600">
                {t('pages.shipping.processingText')}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}