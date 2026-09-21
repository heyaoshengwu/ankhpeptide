import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { alternates } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternates(locale, '/terms') };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: '' });
  const sections = t.raw('pages.terms.sections') as {
    title: string;
    body: string;
  }[];

  return (
    <>
      <Section className="bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
              {t('footer.terms')}
            </h1>
            <p className="text-lg text-slate-600">
              {t('pages.terms.subtitle')}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-slate">
            {sections.map((section, index) => (
              <div key={index}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </div>
            ))}

            <p className="text-sm text-slate-500 mt-8">
              {t('pages.terms.updated')}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}