import React from 'react'
import { getEverything } from '../../lib/content'
import { slugify } from '../../lib/utilities'
import { localeStrings } from '../../lib/constants'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Project from '../../components/Project'
import Container from '../../components/Container'

export default function ProjectPage(props) {
  const { project, projects, nextProject, prevProject } = props

  return (
    <Layout {...props}>
      <Header {...props} />
      <Container>
        {project?.uid && (
          <Project
            project={project}
            projects={projects}
            nextProject={nextProject}
            prevProject={prevProject}
          />
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticPaths({ locales }) {
  const content = await getEverything(false, false, 'project')
  const paths = []

  locales.forEach(async (locale) => {
    const messages = await require(`../../locales/${locale}.json`)

    content.projects.forEach((project) => {
      paths.push({
        params: {
          page: slugify(messages.categories[slugify(project.data.category)]),
          name: project.uid,
        },
        locale,
      })
    })
  })

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params, locale, previewData }) {
  const messages = require(`../../locales/${locale}.json`)
  const content = await getEverything(
    locale,
    previewData,
    'project',
    params.name
  )

  const project = content.projects.find(
    (item) => item?.uid === params.name && item.lang === localeStrings[locale]
  )

  if (!project) {
    return {
      notFound: true,
      props: {
        pages: content.pages,
        settings: content.settings,
        messages,
      },
    }
  }

  const projectsWithSameCategory = content.projects.filter(
    (p) => p.data.category && p.data.category === project.data.category
  )

  const currentCategoryIndex = projectsWithSameCategory.findIndex(
    (item) => item?.uid === params.name
  )
  const nextProject =
    projectsWithSameCategory[currentCategoryIndex + 1] ?? false
  const prevProject =
    projectsWithSameCategory[currentCategoryIndex - 1] ?? false

  return {
    props: {
      project,
      projects: content.projects.map((project) => ({
        ...project,
        data: {
          ...project.data,
          body: [],
        },
      })),
      pages: content.pages,
      settings: content.settings,
      messages,
      prevProject: prevProject?.uid
        ? {
            uid: prevProject?.uid,
            type: prevProject?.type,
            lang: prevProject?.lang,
            data: {
              category: prevProject.data.category,
            },
          }
        : null,
      nextProject: nextProject?.uid
        ? {
            uid: nextProject?.uid,
            type: nextProject?.type,
            lang: nextProject?.lang,
            data: {
              category: nextProject.data.category,
            },
          }
        : null,
    },
  }
}
