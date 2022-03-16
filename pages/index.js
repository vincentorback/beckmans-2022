import React from 'react'
import Container from '../components/Container'
import Credits from '../components/Credits'
import Filters from '../components/Filters'
import Header from '../components/Header'
import Layout from '../components/Layout'
import ProjectAccordions from '../components/ProjectAccordions'
import ProjectLists from '../components/ProjectLists'
import ProjectsGrid from '../components/ProjectsGrid'
import { queryDocuments, fakeProjects } from '../lib/content'
import { categories, SESSION_STARTED, SESSION_CATEGORY } from '../lib/constants'
import debounce from 'lodash.debounce'

const DEFAULT_FILTER = null

const Projects = ({
  activeFilter,
  filters,
  isReady,
  projects,
  setGridLoaded,
}) => {
  const [windowWidth, setWindowWidth] = React.useState(null)
  const [activeItem, setActiveItem] = React.useState(null)
  const [previousActiveItem, setPreviousActiveItem] = React.useState(null)

  const handleSetItem = React.useCallback(
    (item) => {
      isReady &&
        setActiveItem((prev) => {
          setPreviousActiveItem(prev)
          return item
        })
    },
    [isReady, setActiveItem, setPreviousActiveItem]
  )

  React.useEffect(() => {
    setActiveItem((prev) =>
      !activeFilter || prev?.category === activeFilter ? prev : null
    )
    setPreviousActiveItem((prev) =>
      !activeFilter || prev?.category === activeFilter ? prev : null
    )
  }, [activeFilter, setActiveItem])

  const lists = React.useMemo(
    () =>
      filters.map((filter, filterIndex) => ({
        id: filter,
        index: filterIndex,
        items: projects.filter((item) => filter === item.category),
      })),
    [projects, filters]
  )

  React.useEffect(() => {
    const handleResize = debounce(() => {
      setWindowWidth(window.innerWidth)
    }, 200)

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!windowWidth) return <div style={{ height: '100vh' }} />

  return (
    <Container>
      {windowWidth > 800 ? (
        <>
          <ProjectsGrid
            activeFilter={activeFilter}
            isReady={isReady}
            items={projects}
            setGridLoaded={setGridLoaded}
            activeItem={activeItem}
            setActiveItem={handleSetItem}
            previousActiveItem={previousActiveItem}
            setPreviousActiveItem={setPreviousActiveItem}
          />
          <ProjectLists
            activeFilter={activeFilter}
            filters={filters}
            items={projects}
            lists={lists}
            activeItem={activeItem}
            setActiveItem={handleSetItem}
          />
        </>
      ) : (
        <ProjectAccordions items={projects} lists={lists} />
      )}
    </Container>
  )
}

export default function HomePage(props) {
  const { projects, filters } = props

  const [activeFilter, setActiveFilter] = React.useState(DEFAULT_FILTER)
  const [isReady, setReady] = React.useState(false)
  const [gridLoaded, setGridLoaded] = React.useState(false)

  React.useEffect(() => {
    if (gridLoaded) {
      setReady(true)
    }
  }, [gridLoaded])

  React.useEffect(() => {
    if (sessionStorage[SESSION_STARTED]) {
      setReady(true)
    }
  }, [])

  React.useEffect(() => {
    if (sessionStorage[SESSION_CATEGORY]) {
      setActiveFilter(sessionStorage[SESSION_CATEGORY])
    }
  }, [])

  // TODO: Set filter when opening accordions when moving Filters from Header
  const onClick = React.useCallback((filter) => {
    setActiveFilter((prev) => {
      const newFilter = prev === filter ? DEFAULT_FILTER : filter

      if (newFilter) {
        sessionStorage[SESSION_CATEGORY] = newFilter
      }

      return newFilter
    })
  }, [])

  return (
    <Layout {...props}>
      <Header {...props}>
        <Filters
          activeFilter={activeFilter}
          filters={filters}
          isReady={isReady}
          onClick={onClick}
        />
      </Header>
      <Projects
        activeFilter={activeFilter}
        filters={filters}
        isReady={isReady}
        projects={projects}
        setGridLoaded={setGridLoaded}
      />
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  const content = await queryDocuments()
  const pages = content.filter((item) => item.type === 'page')
  const messages = require(`../locales/${locale}.json`)
  const projects = fakeProjects.sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

  if (
    Array.isArray(projects) &&
    projects.some((item) => item.uid === 'apply') === false
  ) {
    projects.splice(36, 0, {
      uid: 'fashion',
      title: locale === 'sv' ? 'Modevisning' : 'Fashion show',
      subtitle: locale === 'sv' ? '17 maj' : 'May 17',
      background: 'var(--color-blue)',
    })

    projects.splice(projects.length, 0, {
      uid: 'apply',
      title: locale === 'sv' ? 'Sök nu' : 'Apply now',
      subtitle: 'beckmans.se',
      background: 'var(--color-red)',
      url:
        locale === 'sv'
          ? 'https://beckmans.se/ansok/'
          : 'https://beckmans.se/en/ansok/',
    })
  }

  return {
    props: {
      filters: categories,
      locale,
      pages,
      projects,
      messages,
    },
  }
}
