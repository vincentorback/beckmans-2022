import React from 'react'
import { queryDocuments, fakeProjects } from '../../lib/content'
import { slugify } from '../../lib/utilities'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Work from '../../components/Work'

export default function Project({ project }) {
  return (
    <Layout>
      <Header />
      <Work project={project} />
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

  // const missingPaths = paths.filter(
  //   (path) => !projects.find((project) => project.name === path.params.name)
  // )

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

  // console.log(3, project.uid)

  // const project = content.find(
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

  // console.log(4, project.uid)

  return {
    props: {
      project,
      pages,
      messages,
    },
  }
}
