import React from 'react'
import { queryDocuments } from '../../lib/content'
import { localeStrings } from '../../lib/constants'
import Layout from '../../components/Layout'
import Header from '../../components/Header'

export default function Page({ page }) {
  return (
    <Layout>
      <Header />
      <p>{page.data.title[0].text}</p>
    </Layout>
  )
}

export async function getStaticPaths({ locales }) {
  const content = await queryDocuments()
  const pages = content.filter((item) => item.type === 'page')
  const paths = []

  locales.forEach((locale) => {
    pages.forEach((page) => {
      if (page.lang === localeStrings[locale].prismicCode) {
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
  const content = await queryDocuments(locale)
  const page = content.find((item) => item.uid === params.page)
  const pages = content.filter((item) => item.type === 'page')
  const messages = require(`../../locales/${locale}.json`)

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
    },
  }
}
