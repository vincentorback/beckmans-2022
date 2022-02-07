import React from 'react'
import Container from '../components/Container'
import Credits from '../components/Credits'
import Filters from '../components/Filters'
import Header from '../components/Header'
import Layout from '../components/Layout'
import ProjectAccordions from '../components/ProjectAccordions'
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
  const containerRef = React.useRef(null)
  const [activeItem, setActiveItem] = React.useState(null)
  const [windowWidth, setWindowWidth] = React.useState(0)

  const onResize = React.useCallback((e) => {
    setWindowWidth(window.innerWidth)
  }, [])

  React.useEffect(() => {
    window.addEventListener('resize', onResize)

    onResize()

    return () => {
      window.addEventListener('resize', onResize)
    }
  }, [onResize])

  if (!windowWidth) return null

  return (
    <Container size="lg">
      {windowWidth > 800 ? (
        <>
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
        </>
      ) : (
        <ProjectAccordions items={projects} />
      )}
    </Container>
  )
}

export default function HomePage(props) {
  const { projects } = props

  const filters = Array.from(
    new Set(projects.map((item) => item.category))
  ).filter((category) => category)

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
    projects.splice(36, 0, {
      uid: 'fashion',
      title: locale === 'sv' ? 'Modevisning' : 'Fashion show',
      subtitle: locale === 'sv' ? '17 maj' : 'May 17',
      color: '#000',
    })

    projects.splice(projects.length, 0, {
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
