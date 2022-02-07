import React from 'react'
import Container from '../components/Container'
import Credits from '../components/Credits'
import Filters from '../components/Filters'
import Header from '../components/Header'
import Layout from '../components/Layout'
import ProjectLists from '../components/ProjectLists'
import ProjectsGrid from '../components/ProjectsGrid'
import Text from '../components/Text'
import { queryDocuments, fakeProjects } from '../lib/content'
import { randomColor, randomFromArray } from '../lib/utilities'

export const fakeCredits = [
  {
    title: 'Utställning',
  },
  {
    title: 'Produktion',
  },
  {
    title: 'Modevisning',
  },
  {
    title: 'Form',
  },
  {
    title: 'Visuell Kommunikation',
  },
  {
    title: 'Mode',
  },
  {
    title: 'Tack till',
  },
]

const DEFAULT_FILTER = null

const Projects = ({ projects, filters, activeFilter }) => {
  const [activeItem, setActiveItem] = React.useState(null)

  return (
    <Container size="lg">
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
    </Container>
  )
}

export default function HomePage(props) {
  const { projects } = props

  const filters = Array.from(new Set(projects.map((item) => item.category)))
    .filter((category) => category)
    .sort((a) => {
      if (a === 'form') return -1
      if (a === 'fashion') return 0
      return 1
    })

  const [activeFilter, setActiveFilter] = React.useState(DEFAULT_FILTER)

  const onClick = React.useCallback(
    (filter) => {
      const newFilter = activeFilter === filter ? DEFAULT_FILTER : filter
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
      <Projects
        projects={projects}
        filters={filters}
        activeFilter={activeFilter}
      />
      <div
        style={{
          backgroundColor: 'var(--color-red)',
        }}
      >
        <Credits data={fakeCredits} />
      </div>
      <div
        style={{
          backgroundColor: 'var(--color-blue)',
        }}
      >
        <Text />
      </div>

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

  if (
    Array.isArray(projects) &&
    projects.some((item) => item.uid === 'apply') === false
  ) {
    projects.push({
      uid: 'apply',
      title: locale === 'sv' ? 'Sök nu' : 'Apply now',
      subtitle: 'beckmans.se',
      color: '#000',
      url:
        locale === 'sv'
          ? 'https://beckmans.se/ansok/'
          : 'https://beckmans.se/en/ansok/',
    })
  }

  return {
    props: {
      locale,
      pages,
      projects,
      messages,
    },
  }
}
