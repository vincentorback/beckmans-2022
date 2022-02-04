import React from 'react'
import ProjectsGrid from '../components/ProjectsGrid'
import ProjectLists from '../components/ProjectLists'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Filters from '../components/Filters'
import { queryDocuments, fakeProjects } from '../lib/content'
import { randomColor } from '../lib/utilities'

const DEFAULT_FILTER = null

export default function HomePage(props) {
  const { projects } = props

  const filters = Array.from(
    new Set(projects.map((item) => item.category))
  ).sort((a) => {
    if (a === 'form') return -1
    if (a === 'fashion') return 0
    return 1
  })

  const [activeFilter, setActiveFilter] = React.useState(DEFAULT_FILTER)
  const [activeItem, setActiveItem] = React.useState(null)

  const onClick = React.useCallback(
    (filter) => {
      const newFilter = activeFilter === filter ? DEFAULT_FILTER : filter
      // setActiveItem((item) =>
      //   !item.category || item.category !== newFilter ? null : item
      // )
      setActiveFilter(newFilter)
    },
    [activeFilter]
  )

  return (
    <Layout {...props}>
      <Header>
        <Filters
          activeFilter={activeFilter}
          filters={filters}
          onClick={onClick}
        />
      </Header>
      <ProjectsGrid
        items={projects}
        activeFilter={activeFilter}
        filters={filters}
        setActiveItem={setActiveItem}
        activeItem={activeItem}
      />
      <ProjectLists
        items={projects}
        activeFilter={activeFilter}
        filters={filters}
        setActiveItem={setActiveItem}
        activeItem={activeItem}
      />
      <div
        style={{
          backgroundColor: 'var(--color-blue)',
          minHeight: '120vh',
          marginBottom: 'var(--site-spacing)',
        }}
      />
      <div
        style={{
          backgroundColor: 'var(--color-red)',
          minHeight: '80vh',
          marginBottom: 'var(--site-spacing)',
        }}
      />
      <div
        style={{
          minHeight: '1px',
        }}
      />
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  const content = await queryDocuments(locale)
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
