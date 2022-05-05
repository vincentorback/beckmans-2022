import { localeStrings } from './constants'
import { createClient } from './prismic'

export async function getEverything(locale, previewData) {
  const client = createClient({ previewData })

  const settings = await client.getSingle('settings')

  const pages = await client.getAllByType('page', {
    lang: locale ? localeStrings[locale] : '*',
  })

  pages.push({
    uid: 'press',
    title: 'Press',
    url: settings?.data?.press_link?.url,
    background_color: 'Black',
  })

  const projects = await client.getAllByType('project', {
    lang: locale ? localeStrings[locale] : '*',
  })

  // TODO: Sort with order in request

  return {
    settings: {
      press_link: settings?.data?.press_link?.url,
      show_link: settings?.data?.graduation_show_link?.url,
      fashion_link: settings?.data?.fashion_show_link?.url,
    },
    pages: pages.sort((a, b) => {
      if (a.uid > b.uid) return 1
      if (a.uid < b.uid) return -1
      return 0
    }),
    projects: projects
      .filter((project) => {
        const isValid =
          project?.uid &&
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
      })
      .map((project) => ({
        ...project,
        alternate_languages: project.alternate_languages.map((altLang) => ({
          ...altLang,
          data: {
            category: project?.data?.category,
          },
        })),
      })),
  }
}
