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
import { categories } from '../lib/constants'
import debounce from 'lodash.debounce'

const DEFAULT_FILTER = null

const Projects = ({ setReady, projects, filters, activeFilter }) => {
  const containerRef = React.useRef(null)
  const [activeItem, setActiveItem] = React.useState(null)
  const [windowWidth, setWindowWidth] = React.useState(0)

  const lists = React.useMemo(
    () =>
      filters.map((filter) => ({
        id: filter,
        items: projects.filter((item) => filter === item.category),
      })),
    [projects, filters]
  )

  React.useEffect(() => {
    setActiveItem((prev) =>
      prev && prev.category === activeFilter ? prev : null
    )
  }, [activeFilter])

  React.useEffect(() => {
    const handleResize = debounce(() => {
      setWindowWidth(window.innerWidth)
    }, 200)

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.addEventListener('resize', handleResize)
    }
  }, [])

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
            setReady={setReady}
          />
          <ProjectLists
            items={projects}
            activeFilter={activeFilter}
            filters={filters}
            lists={lists}
            // setActiveItem={setActiveItem}
            // activeItem={activeItem}
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

  React.useEffect(() => {
    if (localStorage.filter) {
      setActiveFilter(
        localStorage.filter === 'null' ? null : localStorage.filter
      )
    }
  }, [])

  const onClick = React.useCallback(
    (filter) => {
      const newFilter = activeFilter === filter ? DEFAULT_FILTER : filter
      setActiveFilter(newFilter)
      localStorage.filter = newFilter
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
          isReady={isReady}
        />
      </Header>
      <Projects
        projects={projects}
        filters={filters}
        activeFilter={activeFilter}
        setReady={setReady}
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
  // .map((project) => ({
  //   ...project,
  //   image:
  //     'https://images.prismic.io/beckmans2022/082e8cb8-5b75-48a4-a296-3db070cf7ae8_chantalanderson_airbnbmag-16.jpg?auto=compress,format',
  // }))

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
      filters: categories,
      locale,
      pages,
      projects,
      messages,
    },
  }
}
