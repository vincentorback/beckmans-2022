import React from 'react'
import ProjectsGrid from '../components/ProjectsGrid'
import GridFilters from '../components/GridFilters'
import { queryRepeatableDocuments, fakeProjects } from '../lib/content'
import { randomColor } from '../lib/utilities'

const DEFAULT_FILTER = null

export default function Home({ projects }) {
  const filters = Array.from(
    new Set(projects.map((item) => item.category))
  ).sort()
  const [activeFilter, setActiveFilter] = React.useState(DEFAULT_FILTER)
  const onClick = React.useCallback(
    (filter) => {
      setActiveFilter(activeFilter === filter ? DEFAULT_FILTER : filter)
    },
    [activeFilter]
  )

  React.useEffect(() => {
    console.log(window?.__BUILD_MANIFEST?.__rewrites)
  })

  return (
    <>
      <GridFilters
        activeFilter={activeFilter}
        filters={filters}
        onClick={onClick}
      />
      <ProjectsGrid
        items={projects}
        activeFilter={activeFilter}
        filters={filters}
      />
    </>
  )
}

export async function getStaticProps({ locale }) {
  const content = await queryRepeatableDocuments(locale)
  const pages = content.filter((item) => item.type === 'page')
  const messages = require(`../locales/${locale}.json`)
  const projects = fakeProjects

  return {
    props: {
      locale,
      pages,
      projects: projects.map((item) => ({
        ...item,
        color: randomColor(),
      })),
      messages,
    },
  }
}
