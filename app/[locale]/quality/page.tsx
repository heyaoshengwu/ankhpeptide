import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, FileCheck, Microscope } from 'lucide-react';
import { alternates } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternates(locale, '/quality') };
}

const qualityIcons = [Shield, Microscope, FileCheck, Award];

export default async function QualityPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });
  const points = t.raw('pages.quality.points') as {
    title: string;
    description: string;
  }[];
  const coaList = t.raw('pages.quality.coaList') as string[];

  return (
    <>
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
              {t('footer.quality')}
            </h1>
            <p className="text-lg text-slate-600">
              {t('pages.quality.subtitle')}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2 mb-12">
              {points.map((point, index) => {
                const Icon = qualityIcons[index % qualityIcons.length];
                return (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <h3 className="font-semibold mb-2">{point.title}</h3>
                      <p className="text-sm text-slate-600">{point.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-bold mb-4">{t('pages.quality.coaTitle')}</h2>
              <p className="text-slate-600 mb-4">
                {t('pages.quality.coaIntro')}
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                {coaList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-200 pt-8 mt-8">
              <h2 className="text-xl font-bold mb-4">{t('pages.quality.commitmentTitle')}</h2>
              <p className="text-slate-600">
                {t('pages.quality.commitmentText')}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}