import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'
import { slugify } from './utilities'
import enTranslations from '../locales/en.json'
import svTranslations from '../locales/sv.json'

export const repositoryName = 'beckmans2022'
export const endpoint = prismic.getEndpoint(repositoryName)

export function linkResolver(doc, addLocale = false) {
  const localeUrl =
    addLocale && (doc?.lang === 'en' || doc?.lang === 'en-us') ? '/en' : ''

  switch (doc?.type) {
    case 'page':
      return localeUrl + `/${doc.uid}`
    case 'project': {
      if (doc.lang === 'sv-se') {
        return (
          localeUrl +
          `/${slugify(svTranslations.categories[slugify(doc.data.category)])}/${
            doc.uid
          }`
        )
      } else {
        return (
          localeUrl +
          `/${slugify(enTranslations.categories[slugify(doc.data.category)])}/${
            doc.uid
          }`
        )
      }
    }
    default:
      return localeUrl === '/en' ? localeUrl : localeUrl + '/'
  }
}

export function createClient({ req, previewData }) {
  const client = prismic.createClient(endpoint)

  enableAutoPreviews({
    client,
    previewData,
    req,
  })

  return client
}
