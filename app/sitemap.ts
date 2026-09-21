import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

const BASE_URL = process.env.SITE_URL || 'https://ankhpeptide.com';

export const dynamic = 'force-dynamic';

const locales = ['en', 'zh', 'zh-TW', 'ja', 'ko', 'es', 'de', 'fr', 'nl', 'ar', 'tr', 'fa', 'vi', 'th', 'ms', 'id', 'tl'];

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

const staticPages: { path: string; priority: number; changeFrequency: ChangeFrequency }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: 'products', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'test-results', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'about', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'b2b', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'capabilities', priority: 0.7, changeFrequency: 'monthly' },
  { path: 'technical', priority: 0.6, changeFrequency: 'monthly' },
  { path: 'faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: 'shipping', priority: 0.5, changeFrequency: 'yearly' },
  { path: 'quality', priority: 0.5, changeFrequency: 'yearly' },
  { path: 'contact', priority: 0.6, changeFrequency: 'yearly' },
  { path: 'privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: 'terms', priority: 0.2, changeFrequency: 'yearly' },
  { path: 'disclaimer', priority: 0.2, changeFrequency: 'yearly' },
];

function entry(path: string, priority: number, changeFrequency: ChangeFrequency): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      const url = page.path === '' ? `/${locale}` : `/${locale}/${page.path}`;
      entries.push(entry(url, page.priority, page.changeFrequency));
    }
  }

  const products = await prisma.product.findMany({
    where: { published: true },
    select: { slug: true },
  });

  for (const locale of locales) {
    for (const p of products) {
      entries.push(entry(`/${locale}/products/${p.slug}`, 0.9, 'weekly'));
    }
  }

  return entries;
}