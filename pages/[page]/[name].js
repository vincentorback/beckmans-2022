import React from 'react'
import Link from 'next/link'
import { queryRepeatableDocuments } from '../../lib/content'
import { slugify } from '../../lib/utilities'
import Footer from '../../components/Footer'
import Work from '../../components/Work'

export default function Project({ pages, project }) {
  return (
    <div>
      <Work project={project} />
      <Footer pages={pages}>
        <p>hej</p>
      </Footer>
    </div>
  )
}

export async function getStaticPaths({ locales, preview }) {
  const content = await queryRepeatableDocuments()
  const projects = content.filter((item) => item.type === 'project')

  const paths = projects.map((item) => ({
    params: {
      page: slugify(item.data.category),
      name: item.uid,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params, locale, preview }) {
  const content = await queryRepeatableDocuments(locale)
  const project = content.find(
    (item) => item.type === 'project' && item.uid === params.name
  )
  const pages = content.filter((item) => item.type === 'page')

  if (!project) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      project,
      pages,
    },
  }
}
