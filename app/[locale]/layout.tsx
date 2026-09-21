import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { GA4Provider } from '@/components/analytics/ga4-provider';
import { orgJsonLd, websiteJsonLd, siteUrl, ogLocales } from '@/lib/seo';

const inter = Inter({ subsets: ['latin'] });

type LocaleParams = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [
    { locale: 'en' }, { locale: 'zh' }, { locale: 'zh-TW' }, { locale: 'ja' }, { locale: 'ko' },
    { locale: 'es' }, { locale: 'de' }, { locale: 'fr' }, { locale: 'nl' },
    { locale: 'ar' }, { locale: 'tr' }, { locale: 'fa' }, { locale: 'vi' },
    { locale: 'th' }, { locale: 'ms' }, { locale: 'id' }, { locale: 'tl' }
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const title = t('title');
  const description = t('description');

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    metadataBase: new URL(siteUrl()),
    openGraph: {
      type: 'website',
      url: siteUrl(`/${locale}`),
      siteName: 'AnkhPeptide',
      title,
      description,
      locale: ogLocales[locale],
      alternateLocale: Object.values(ogLocales).filter(v => v !== ogLocales[locale]),
      images: [
        {
          url: siteUrl('/og-image.png'),
          width: 1200,
          height: 630,
          alt: 'AnkhPeptide - Ultra-pure research peptides',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteUrl('/og-image.png')],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const rtlLocales = ['ar', 'fa', 'he'];

const supportedLocales = new Set([
  'en', 'zh', 'zh-TW', 'ja', 'ko', 'es', 'de', 'fr', 'nl',
  'ar', 'tr', 'fa', 'vi', 'th', 'ms', 'id', 'tl'
]);

export default async function LocaleLayout({
  children,
  params,
}: LocaleParams) {
  const { locale } = await params;
  if (!supportedLocales.has(locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const isRTL = rtlLocales.includes(locale);

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}>
            <GA4Provider />
          </Suspense>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([orgJsonLd, websiteJsonLd]),
            }}
          />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-config" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}