import React from 'react'
import { getSingle, getEverything } from '../../lib/content'
import { useTranslations } from 'next-intl'
import { slugify } from '../../lib/utilities'
import { localeStrings } from '../../lib/constants'
import * as prismicH from '@prismicio/helpers'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Project from '../../components/Project'
import Container from '../../components/Container'

export default function ProjectPage(props) {
  const { project, projects, nextProject, prevProject } = props
  const t = useTranslations('categories')

  return (
    <Layout
      title={`${prismicH.asText(project.data.name)} - ${t(
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

  locales.forEach(async (locale) => {
    const messages = await require(`../../locales/${locale}.json`)

    content.projects.forEach((project) => {
      if (project.lang.includes(locale)) {
        paths.push({
          params: {
            page: slugify(messages.categories[slugify(project.data.category)]),
            name: slugify(project.uid),
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

export async function getStaticProps({ params, locale, previewData }) {
  const messages = require(`../../locales/${locale}.json`)
  const content = await getEverything(locale, previewData)

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

  const currentIndex = content.projects.findIndex(
    (item) =>
      item?.data?.name &&
      slugify(prismicH.asText(item.data.name)) === params.name
  )

  const nextProject = content.projects[currentIndex + 1] ?? false
  const prevProject = content.projects[currentIndex - 1] ?? false

  const otherLocaleProject =
    project?.alternate_languages?.length &&
    (await getSingle(
      'project',
      project.alternate_languages[0].uid,
      Object.keys(localeStrings).find(
        (key) => localeStrings[key] === project.alternate_languages[0].lang
      ),
      previewData
    ))

  return {
    props: {
      project,
      projects: content.projects,
      pages: content.pages,
      settings: content.settings,
      messages,
      prevProject,
      nextProject,
      alternatePage: otherLocaleProject,
    },
  }
}
