import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const slugs = [
  '3-o-ethyl-ascorbic-acid',
  'ectoine',
  'decarboxy-carnosine-hydrochloride',
  'hydroxypropyl-tetrahydropyrantriol',
  'ergothioneine',
  'sodium-pca',
  'zinc-pca',
  'magnesium-pca',
  'sodium-lauroyl-sarcosinate',
];
(async () => {
  for (const slug of slugs) {
    const r = await prisma.product.deleteMany({ where: { slug } });
    console.log(slug, 'deleted:', r.count);
  }
  console.log('remaining products:', await prisma.product.count());
  await prisma.$disconnect();
})();
