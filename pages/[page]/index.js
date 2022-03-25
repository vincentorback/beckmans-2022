import React from 'react'
import { getEverything } from '../../lib/content'
import { localeStrings } from '../../lib/constants'
import Container from '../../components/Container'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import Slices from '../../components/Slices'
import Text from '../../components/Text'

export default function Page(props) {
  const { page, background } = props

  const backgroundColor = background ? background.toLowerCase() : 'white'

  React.useEffect(() => {
    document.documentElement.style.backgroundColor = `var(--color-${backgroundColor})`

    return () => {
      document.documentElement.style.backgroundColor = `var(--color-white)`
    }
  }, [backgroundColor])

  return (
    <Layout
      {...props}
      title={page.data.title[0].text}
      background={page?.data?.background_color}
    >
      <Header {...props} />
      <Container>
        <div className="Layout-content">
          {page.data.body ? (
            <Slices body={page.data.body} />
          ) : (
            <Text title="no content yet" />
          )}
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths({ locales }) {
  const content = await getEverything()
  const paths = []

  locales.forEach((locale) => {
    content.pages.forEach((page) => {
      if (page.lang.includes(locale)) {
        paths.push({
          params: {
            page: page.uid,
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
  const page = content.pages.find(
    (item) => item.uid === params.page && item.lang === localeStrings[locale]
  )

  if (!page) {
    return {
      notFound: true,
      props: {
        pages: content.pages,
        messages,
      },
    }
  }

  return {
    props: {
      background: page?.data?.background_color,
      page,
      pages: content.pages,
      messages,
      otherLocalePage: page.alternate_languages[0],
    },
  }
}
