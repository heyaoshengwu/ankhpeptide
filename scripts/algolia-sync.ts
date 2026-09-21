import { PrismaClient } from '@prisma/client'
import algoliasearch from 'algoliasearch'
import type { AlgoliaProduct } from '../lib/algolia'

const prisma = new PrismaClient()

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ''
const adminKey = process.env.ALGOLIA_ADMIN_KEY || ''
const indexName = 'products'

async function syncProductsToAlgolia() {
  console.log('Starting Algolia sync...')

  if (!appId || !adminKey) {
    console.error('Missing Algolia credentials. Set NEXT_PUBLIC_ALGOLIA_APP_ID and ALGOLIA_ADMIN_KEY environment variables.')
    process.exit(1)
  }

  const client = algoliasearch(appId, adminKey)
  const index = client.initIndex(indexName)

  // Fetch all products with their translations, categories, and specifications
  const products = await prisma.product.findMany({
    where: { published: true },
    include: {
      translations: true,
      categories: {
        include: {
          category: {
            include: {
              translations: true
            }
          }
        }
      },
      specifications: true
    }
  })

  console.log(`Found ${products.length} products to sync`)

  // Transform products to Algolia format
  const algoliaProducts: AlgoliaProduct[] = products.map((product) => {
    // Get English translation or first available translation
    const translation = product.translations.find(t => t.locale === 'en')
      || product.translations[0]

    // Get English category names or first available
    const categories = product.categories.map(pc => {
      const catTranslation = pc.category.translations.find(t => t.locale === 'en')
        || pc.category.translations[0]
      return catTranslation?.name || pc.category.slug
    })

    return {
      objectID: product.id,
      slug: product.slug,
      name: translation?.name || product.slug,
      description: translation?.description || undefined,
      application: translation?.application || undefined,
      categories,
      specifications: product.specifications.map(spec => ({
        key: spec.key,
        value: spec.value,
        unit: spec.unit || undefined
      })),
      createdAt: product.createdAt.getTime(),
      updatedAt: product.updatedAt.getTime()
    }
  })

  // Save objects to Algolia (replaces all existing objects)
  const { objectIDs } = await index.saveObjects(algoliaProducts)

  console.log(`Successfully synced ${objectIDs.length} products to Algolia`)

  // Configure index settings for better search experience
  await index.setSettings({
    searchableAttributes: [
      'name',
      'description',
      'categories',
      'application'
    ],
    attributesForFaceting: [
      'categories'
    ],
    customRanking: [
      'desc(updatedAt)'
    ],
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>'
  })

  console.log('Index settings updated')

  await prisma.$disconnect()
  console.log('Sync complete!')
}

syncProductsToAlgolia().catch((error) => {
  console.error('Sync failed:', error)
  process.exit(1)
})
