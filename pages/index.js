import React from 'react'
import Container from '../components/Container'
import Filters from '../components/Filters'
import Header from '../components/Header'
import Layout from '../components/Layout'
import ProjectAccordions from '../components/ProjectAccordions'
import ProjectLists from '../components/ProjectLists'
import ProjectsGrid from '../components/ProjectsGrid'
import { getEverything } from '../lib/content'
import { categories, SESSION_CATEGORY, SESSION_ITEM } from '../lib/constants'
import { slugify } from '../lib/utilities'
import debounce from 'lodash.debounce'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

const DEFAULT_FILTER = null

const Projects = ({
  activeFilter,
  filters,
  isReady,
  projects,
  setGridLoaded,
}) => {
  const t = useTranslations('categories')
  const router = useRouter()
  const [dimensions, setDimensions] = React.useState(null)
  const [activeItem, setActiveItem] = React.useState(null)
  const [previousActiveItem, setPreviousActiveItem] = React.useState(null)
  const [inTransition, setInTransition] = React.useState()

  const handleSetItem = React.useCallback(
    (item) => {
      !inTransition &&
        isReady &&
        setActiveItem((prev) => {
          setPreviousActiveItem(prev)
          return item
        })
    },
    [inTransition, isReady, setActiveItem, setPreviousActiveItem]
  )

  React.useEffect(() => {
    const handleRouteStart = (url) => {
      if (url !== '/') {
        setInTransition(true)
      }
    }

    const handleRouteComplete = () => {
      if (router.asPath === '/') {
        setInTransition(false)
      }
    }

    router.events.on('routeChangeStart', handleRouteStart)
    router.events.on('routeChangeComplete', handleRouteComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteStart)
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [router])

  React.useEffect(() => {
    if (!isReady && sessionStorage[SESSION_ITEM]) {
      const project = projects.find(
        (p) => p.uid === sessionStorage[SESSION_ITEM]
      )

      if (
        project &&
        (!activeFilter || slugify(project.data.category) === activeFilter)
      ) {
        setActiveItem(project)
        delete sessionStorage[SESSION_ITEM]
      }
    }
  }, [projects, isReady, activeFilter])

  React.useEffect(() => {
    if (inTransition) return

    setActiveItem((prev) =>
      !activeFilter || slugify(prev?.data.category) === activeFilter
        ? prev
        : null
    )
    setPreviousActiveItem((prev) =>
      !activeFilter || slugify(prev?.data.category) === activeFilter
        ? prev
        : null
    )
  }, [inTransition, activeFilter, setActiveItem])

  const lists = React.useMemo(
    () =>
      filters
        .map((filter, filterIndex) => ({
          id: filter,
          index: filterIndex,
          label: t(filter),
          items: projects.filter(
            (project) =>
              project?.data?.category &&
              filter === slugify(project.data.category)
          ),
        }))
        .filter((list) => list?.items?.length),
    [filters, projects]
  )

  React.useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions([window.innerWidth, window.innerHeight])
    }, 200)

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!dimensions?.length) return <div style={{ height: '100vh' }} />

  return (
    <Container>
      {dimensions[0] > 800 ? (
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
            lists={lists}
            isReady={isReady}
            setActiveItem={dimensions[1] > 800 && handleSetItem}
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
    if (sessionStorage[SESSION_CATEGORY]) {
      setActiveFilter(sessionStorage[SESSION_CATEGORY])
    }
  }, [])

  const handleSetFilter = React.useCallback((filter) => {
    setActiveFilter((prev) => {
      const newFilter = !filter || prev === filter ? DEFAULT_FILTER : filter

      if (newFilter) {
        sessionStorage[SESSION_CATEGORY] = newFilter
      } else {
        delete sessionStorage[SESSION_CATEGORY]
      }

      return newFilter
    })
  }, [])

  return (
    <Layout {...props}>
      <Header {...props} setFilter={handleSetFilter}>
        <Filters
          activeFilter={activeFilter}
          filters={filters}
          isReady={isReady}
          onChange={handleSetFilter}
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

export async function getStaticProps({ locale, previewData }) {
  const content = await getEverything(locale, previewData, 'home')
  const messages = require(`../locales/${locale}.json`)

  content.projects.push({
    uid: 'beckmans',
    title: 'Beckmans.se',
    url: 'https://beckmans.se',
    backgroundColor: 'Black',
  })

  content.projects = content.projects.concat(content.pages)

  return {
    props: {
      filters: categories,
      locale,
      pages: content.pages,
      projects: content.projects,
      settings: content.settings,
      messages,
    },
  }
}
