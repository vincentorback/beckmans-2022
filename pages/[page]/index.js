import React from 'react'
import { queryDocuments } from '../../lib/content'
import { localeStrings } from '../../lib/constants'
import Container from '../../components/Container'
import Credits from '../../components/Credits'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import Slices from '../../components/Slices'
import Text from '../../components/Text'

export default function Page(props) {
  const { page } = props

  return (
    <Layout
      {...props}
      title={page.data.title[0].text}
      background={page?.data?.background_color}
    >
      <Header {...props} />
      <Container>
        <div className="MainContent">
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
  const content = await queryDocuments()
  const pages = content.filter((item) => item.type === 'page')
  const paths = []

  locales.forEach((locale) => {
    pages.forEach((page) => {
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

export async function getStaticProps({ params, locale }) {
  const content = await queryDocuments()
  const pages = content.filter((item) => item.type === 'page')
  const page = pages.find(
    (item) => item.uid === params.page && item.lang === localeStrings[locale]
  )
  const messages = require(`../../locales/${locale}.json`)

  const otherLocalePage = pages.find(
    (item) => item.uid === page.alternate_languages[0].uid
  )

  if (!page) {
    return {
      notFound: true,
      props: {
        pages,
        messages,
      },
    }
  }

  return {
    props: {
      page,
      pages,
      messages,
      otherLocalePage,
    },
  }
}
