import { localeStrings } from './constants'
import { createClient } from './prismic'

export async function getEverything(locale, previewData) {
  const client = await createClient({ previewData })

  const pages = await client.getAllByType('page', {
    lang: locale ? localeStrings[locale] : '*',
    orderings: {
      field: 'document.first_publication_date',
      direction: 'asc',
    },
  })

  const projects = await client.getAllByType('project', {
    lang: locale ? localeStrings[locale].prismic : '*',
    orderings: {
      field: 'document.first_publication_date',
      direction: 'asc',
    },
  })

  // TODO: Sort with orderings in request

  return {
    pages: pages.sort((a, b) => {
      if (a.uid > b.uid) return 1
      if (a.uid < b.uid) return -1
      return 0
    }),
    projects: projects
      .filter((project) => {
        const isValid =
          project?.data?.main_image?.url &&
          project?.data?.name &&
          project?.data?.category

        if (!isValid) {
          console.log(`Project ${project?.uid} is not invalid`)
        }

        return isValid
      })
      .sort((a, b) => {
        if (a.uid > b.uid) return 1
        if (a.uid < b.uid) return -1
        return 0
      }),
  }
}

export async function getSingle(type, uid, locale, previewData) {
  const client = await createClient({ previewData })

  const page = await client.getByUID(type, uid, {
    lang: locale ? localeStrings[locale] : '*',
  })

  return page
}
