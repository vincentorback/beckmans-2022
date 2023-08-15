import { localeStrings } from './constants'
import { createClient } from './prismic'

export async function getEverything(
  locale,
  previewData,
  sourcePage,
  docId = null
) {
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
  let thisProject = false

  if (['home', 'project', 'sitemap'].includes(sourcePage)) {
    const otherProjects = await client.getAllByType('project', {
      lang: locale ? localeStrings[locale] : '*',
      graphQuery: `{
        project {
          name
          project_title
          main_image
          image_position
          category
        }
      }`,
      orderings: {
        field: 'my.project.uid',
        direction: 'asc',
      },
    })

    if (docId && ['project'].includes(sourcePage)) {
      thisProject = await client.getByUID('project', docId, {
        lang: locale ? localeStrings[locale] : '*',
      })
    }

    projects = otherProjects.map((project) => {
      if (thisProject && project?.uid === docId) {
        return thisProject
      }

      return project
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
