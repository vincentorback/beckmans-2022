import { client, apiRoutes } from './prismic'
import { localeStrings } from './constants'
import { randomProject } from './utilities'
import fakeData from './fake-data.json'

export const fakeProjects = fakeData

async function fetchDocs(locale) {
  const documents = await client.get({
    lang: locale ? localeStrings[locale] : '*',
    pageSize: 9999,
  })

  const allRoutes = documents.results

  return [...new Set(allRoutes)]
}

export const queryDocuments = async (locale) => {
  const allRoutes = await fetchDocs(locale)

  return allRoutes
}
