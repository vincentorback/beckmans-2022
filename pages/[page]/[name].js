import React from 'react'
import { queryDocuments, fakeProjects } from '../../lib/content'
import { useTranslations } from 'next-intl'
import { slugify } from '../../lib/utilities'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Project from '../../components/Project'

export default function ProjectPage(props) {
  const { project, projects, nextProject, prevProject } = props
  const t = useTranslations('categories')

  return (
    <Layout title={project.name} {...props}>
      <Header />
      <Project
        project={project}
        projects={projects}
        nextProject={nextProject}
        prevProject={prevProject}
      />
    </Layout>
  )
}

export async function getStaticPaths({ locales }) {
  // const content = await queryDocuments()
  const projects = fakeProjects // content.filter((item) => item.type === 'project')
  const paths = []

  locales.forEach((locale) => {
    projects.forEach((project) => {
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

export async function getStaticProps({ params, locale }) {
  const content = await queryDocuments()
  const projects = fakeProjects.sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

  const project = projects.find((item) => slugify(item.name) === params.name)
  const currentIndex = projects.findIndex(
    (item) => slugify(item.name) === params.name
  )

  const nextProject = projects[currentIndex + 1] ?? false
  const prevProject = projects[currentIndex - 1] ?? false

  const pages = content.filter((item) => item.type === 'page')
  const messages = require(`../../locales/${locale}.json`)

  if (!project) {
    return {
      notFound: true,
      props: {
        pages,
        messages,
      },
    }
  }

  return {
    props: {
      project,
      projects,
      pages,
      messages,
      prevProject,
      nextProject,
    },
  }
}
