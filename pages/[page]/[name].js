import React from 'react'
import { queryRepeatableDocuments, fakeProjects } from '../../lib/content'
import { slugify } from '../../lib/utilities'
import Work from '../../components/Work'

export default function Project({ project }) {
  return <Work project={project} />
}

export async function getStaticPaths({ locales }) {
  // const content = await queryRepeatableDocuments()
  const projects = fakeProjects // content.filter((item) => item.type === 'project')
  const paths = []

  locales.forEach((locale) => {
    projects.forEach((project) => {
      if (project.lang.includes(locale)) {
        const split = project.url.split('/')

        paths.push({
          params: {
            page: split[1],
            name: split[2],
          },
          locale,
        })
      }
    })
  })

  // console.log(paths)

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params, locale }) {
  console.log(123, params, locale)

  const content = await queryRepeatableDocuments(locale)
  const project = fakeProjects.find(
    (item) => slugify(item.name) === params.name
  )

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

  return {
    props: {
      project,
      pages,
      messages,
    },
  }
}
