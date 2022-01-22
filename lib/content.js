import { Client } from './prismic'
import { localeStrings } from './constants'

async function fetchDocs(locale = '*') {
  const prismicLocale = locale === '*' ? '*' : localeStrings[locale].prismicCode
  const page = 1
  const routes = []
  const response = await Client().query('', {
    pageSize: 100,
    lang: prismicLocale,
    page,
  })
  const allRoutes = routes.concat(response.results)

  if (response.results_size + routes.length < response.total_results_size) {
    return fetchDocs(page + 1, allRoutes)
  }

  return [...new Set(allRoutes)]
}

/** Fetches all Prismic documents and filters them (eg. by document type).
 *  In production, you would probably query documents by type instead of filtering them.
 **/
export const queryRepeatableDocuments = async (locale) => {
  const allRoutes = await fetchDocs(locale)

  let projects = allRoutes.filter((route) => route.type === 'project')
  const pages = allRoutes.filter((route) => route.type !== 'project')

  const projectLengthTarget = 41
  let i = 0

  while (projects.length < projectLengthTarget) {
    projects.push({
      ...projects[i],
      uid: `${projects[i].uid}-${i}`,
    })

    i = projects.length > i ? i + 1 : 0
  }

  return [...projects, ...pages]
}
