import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const categories = [
    { slug: 'peptides', translations: [{ locale: 'en', name: 'Peptides' }, { locale: 'zh', name: '多肽' }, { locale: 'ja', name: 'ペプチド' }] },
    { slug: 'glp-1', translations: [{ locale: 'en', name: 'GLP-1 Analogs' }, { locale: 'zh', name: 'GLP-1类似物' }, { locale: 'ja', name: 'GLP-1アナログ' }] },
    { slug: 'sarms', translations: [{ locale: 'en', name: 'SARMs' }, { locale: 'zh', name: 'SARMs' }, { locale: 'ja', name: 'SARMs' }] },
    { slug: 'bioregulators', translations: [{ locale: 'en', name: 'Bioregulators' }, { locale: 'zh', name: '生物调节剂' }, { locale: 'ja', name: '生体調節剤' }] },
    { slug: 'nootropics', translations: [{ locale: 'en', name: 'Nootropics' }, { locale: 'zh', name: '促智药' }, { locale: 'ja', name: 'スマートドラッグ' }] },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        slug: cat.slug,
        translations: {
          create: cat.translations,
        },
      },
    })
  }

  const products = [
    {
      slug: 'glp-1-analog',
      published: true,
      translations: [
        { locale: 'en', name: 'GLP-1 Analog', description: 'Glucagon-like peptide-1 analog for metabolic research and diabetes treatment development.' },
        { locale: 'zh', name: 'GLP-1类似物', description: '用于代谢研究和糖尿病治疗开发的胰高血糖素样肽-1类似物。' },
        { locale: 'ja', name: 'GLP-1アナログ', description: '代謝研究および糖尿病治療開発のためのGLP-1類似体。' },
      ],
      categorySlugs: ['glp-1', 'peptides'],
      specifications: [
        { key: 'Molecular Formula', value: 'C147H226N40O45' },
        { key: 'Molecular Weight', value: '3298.6', unit: 'Da' },
        { key: 'Purity (HPLC)', value: '≥95%' },
        { key: 'Appearance', value: 'White to off-white lyophilized powder' },
        { key: 'Storage', value: '-20°C, protected from light' },
      ],
    },
    {
      slug: 'cetrorelix',
      published: true,
      translations: [
        { locale: 'en', name: 'Cetrorelix', description: 'Gonadotropin-releasing hormone antagonist for fertility and hormone research.' },
        { locale: 'zh', name: '西曲瑞克', description: '用于生育和激素研究的促性腺激素释放激素拮抗剂。' },
        { locale: 'ja', name: 'セトロレリクス', description: '生殖補助医療およびホルモン研究のためのGnRH拮抗剤。' },
      ],
      categorySlugs: ['peptides'],
      specifications: [
        { key: 'Molecular Formula', value: 'C70H92ClN17O14' },
        { key: 'Molecular Weight', value: '1431.1', unit: 'Da' },
        { key: 'Purity (HPLC)', value: '≥98%' },
        { key: 'Storage', value: '-20°C' },
      ],
    },
    {
      slug: 'thymosin-alpha-1',
      published: true,
      translations: [
        { locale: 'en', name: 'Thymosin Alpha 1', description: 'Immunomodulating peptide that enhances T-cell function and immune response.' },
        { locale: 'zh', name: '胸腺肽α1', description: '增强T细胞功能和免疫反应的免疫调节肽。' },
        { locale: 'ja', name: 'サイモシンα1', description: 'T細胞機能と免疫応答を強化する免疫調節ペプチド。' },
      ],
      categorySlugs: ['peptides', 'bioregulators'],
      specifications: [
        { key: 'Molecular Formula', value: 'C129H215N33O55' },
        { key: 'Molecular Weight', value: '3108.3', unit: 'Da' },
        { key: 'Purity (HPLC)', value: '≥99%' },
        { key: 'Storage', value: '-20°C' },
      ],
    },
  ]

  for (const p of products) {
    const cats = await prisma.category.findMany({
      where: { slug: { in: p.categorySlugs } },
    })

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        published: p.published,
        translations: { create: p.translations },
        specifications: { create: p.specifications },
        categories: {
          create: cats.map(c => ({ categoryId: c.id })),
        },
      },
    })
  }

  console.log('Seed complete!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
