import { localeStrings } from './constants'
import fakeData from './fake-data.json'
import { createClient } from './prismic'

export async function getEverything(locale, previewData) {
  const client = await createClient({ previewData })

  const pages = await client.getAllByType('page', {
    lang: locale ? localeStrings[locale] : '*',
  })

  const projects = fakeData.sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

  // TODO: get all projects from Prismic
  // const projects = await client.getAllByType('projet', {
  //   lang: locale ? localeStrings[locale].prismic : '*',
  // })

  return {
    pages,
    projects,
  }
}
