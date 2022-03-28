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
    <Layout
      title={`${project.data.name[0].text} - ${t(
        slugify(project.data.category)
      )}`}
      {...props}
    >
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
            page: slugify(project.data.category),
            name: slugify(project.uid),
          },
          locale,
        })
      }
    })
  })

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params, locale, previewData }) {
  const messages = require(`../../locales/${locale}.json`)
  const content = await getEverything(locale, previewData)

  const project = content.projects.find(
    (item) =>
      item?.data?.name && slugify(item.data.name[0].text) === params.name
  )
  const currentIndex = content.projects.findIndex(
    (item) =>
      item?.data?.name && slugify(item.data.name[0].text) === params.name
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
      otherLocalePage: project?.alternate_languages[0] ?? false,
    },
  }
}
