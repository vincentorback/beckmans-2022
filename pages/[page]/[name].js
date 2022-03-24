import React from 'react'
import { getEverything } from '../../lib/content'
import { useTranslations } from 'next-intl'
import { slugify } from '../../lib/utilities'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Project from '../../components/Project'
import Container from '../../components/Container'

export default function ProjectPage(props) {
  const { project, projects, nextProject, prevProject } = props
  const t = useTranslations('categories')

  return (
    <Layout title={`${project.name} - ${t(project.category)}`} {...props}>
      <Header {...props} />
      <Container>
        <Project
          project={project}
          projects={projects}
          nextProject={nextProject}
          prevProject={prevProject}
        />
      </Container>
    </Layout>
  )
}

export async function getStaticPaths({ locales }) {
  const content = await getEverything()
  const paths = []

  locales.forEach((locale) => {
    content.projects.forEach((project) => {
      if (project.lang.includes(locale)) {
        paths.push({
          params: {
            page: slugify(project.category),
            name: slugify(project.name),
          },
          locale,
        })
      }
    })
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params, locale, locales, previewData }) {
  const messages = require(`../../locales/${locale}.json`)
  const content = await getEverything(locale, previewData)

  const project = content.projects.find(
    (item) => slugify(item.name) === params.name
  )
  const currentIndex = content.projects.findIndex(
    (item) => slugify(item.name) === params.name
  )

  const nextProject = content.projects[currentIndex + 1] ?? false
  const prevProject = content.projects[currentIndex - 1] ?? false

  if (!project) {
    return {
      notFound: true,
      props: {
        pages: content.pages,
        messages,
      },
    }
  }

  return {
    props: {
      project,
      projects: content.projects,
      pages: content.pages,
      messages,
      prevProject,
      nextProject,
      // otherLocalePage: project.alternate_languages[0],
      otherLocalePage: {
        uid: project.uid,
        lang: locales.find((item) => item !== locale),
        category: project.category,
        type: 'project',
      },
    },
  }
}
