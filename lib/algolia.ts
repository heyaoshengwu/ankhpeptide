import algoliasearch from 'algoliasearch'
import type { SearchClient } from 'algoliasearch'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ''
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ''
const adminKey = process.env.ALGOLIA_ADMIN_KEY || ''

export const ALGOLIA_INDEX_NAME = 'products'

const isConfigured = !!(appId && searchKey)

export const searchClient: SearchClient | null = isConfigured
  ? algoliasearch(appId, searchKey)
  : null

export const adminClient = isConfigured && adminKey
  ? algoliasearch(appId, adminKey)
  : null

export interface AlgoliaProduct {
  objectID: string
  slug: string
  name: string
  description?: string
  application?: string
  categories: string[]
  specifications: Array<{
    key: string
    value: string
    unit?: string
  }>
  createdAt: number
  updatedAt: number
}
