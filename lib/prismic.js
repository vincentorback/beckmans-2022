import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'
import { slugify } from './utilities'

export const repositoryName = 'beckmans2022'
export const endpoint = prismic.getEndpoint(repositoryName)

export function linkResolver(doc, addLocale = false) {
  const localeUrl =
    addLocale && (doc.lang === 'en' || doc.lang === 'en-us') ? '/en' : ''

  switch (doc?.type) {
    case 'page':
      return localeUrl + `/${doc.uid}`
    case 'project':
      return localeUrl + `/${slugify(doc.category)}/${doc.uid}`
    default:
      return localeUrl + '/'
  }
}

export function createClient(config = {}) {
  const client = prismic.createClient(endpoint, {
    ...config,
  })

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  return client
}
