import { localeStrings } from './constants'
import { createClient } from './prismic'

export async function getEverything(locale, previewData, sourcePage) {
  const client = createClient({ previewData })

  const settings = await client.getSingle('settings')

  const pages = await client.getAllByType('page', {
    lang: locale ? localeStrings[locale] : '*',
    orderings: {
      field: 'my.page.uid',
      direction: 'asc',
    },
    graphQuery:
      sourcePage !== 'page'
        ? `{
        page {
          title
          background_color
        }
      }`
        : null,
  })

  pages.push({
    uid: 'press',
    title: 'Press',
    url: settings?.data?.press_link?.url,
    backgroundColor: 'Black',
  })

  let projects = []

  if (['home', 'project', 'sitemap'].includes(sourcePage)) {
    projects = await client.getAllByType('project', {
      lang: locale ? localeStrings[locale] : '*',
      graphQuery:
        sourcePage !== 'project'
          ? `{
        project {
          name
          project_title
          main_image
          image_position
          category
        }
      }`
          : null,
      orderings: {
        field: 'my.project.uid',
        direction: 'asc',
      },
    })
  }

  return {
    settings: {
      press_link: settings?.data?.press_link?.url ?? null,
      show_link: settings?.data?.graduation_show_link?.url ?? null,
      fashion_link: settings?.data?.fashion_show_link?.url ?? null,
    },
    pages, // TODO: Sort by Medverkande, Om Utställningen, Press
    projects: projects
      .filter((project) => {
        const isValid =
          project?.uid?.length &&
          project?.data?.main_image?.url?.length &&
          project?.data?.name?.length &&
          project?.data?.category?.length

        if (!isValid) {
          console.log(`Project ${project?.uid} is not invalid`)
        }

        return isValid
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
