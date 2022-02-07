import React from 'react'
import { queryDocuments, fakeProjects } from '../../lib/content'
import { useTranslations } from 'next-intl'
import { slugify } from '../../lib/utilities'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Project from '../../components/Project'

export default function ProjectPage({ project, nextProject, prevProject }) {
  const t = useTranslations('categories')

  return (
    <Layout>
      <Header>
        <p>
          {project.name} - {t(project.category)}
        </p>
      </Header>
      <Project
        project={project}
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
  const content = await queryDocuments(locale)
  const project = fakeProjects.find(
    (item) => slugify(item.name) === params.name
  )
  const currentIndex = fakeProjects.findIndex(
    (item) => slugify(item.name) === params.name
  )
  const nextProject = fakeProjects[currentIndex + 1]
  const prevProject = fakeProjects[currentIndex - 1]
  // const project content.find(
  //   (item) => item.type === 'project' && item.uid === params.name
  // )

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
      pages,
      messages,
      prevProject,
      nextProject,
    },
  }
}
