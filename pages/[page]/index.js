import React from 'react'
import { queryDocuments } from '../../lib/content'
import { localeStrings } from '../../lib/constants'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Credits from '../../components/Credits'
import Text from '../../components/Text'

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

export default function Page(props) {
  const { page } = props

  console.log(page)

  const isCredits = page.uid === 'credits' || page.uid === 'medverkande'

  return (
    <Layout {...props} background={page.data.background_color}>
      <Header />
      {isCredits ? (
        <Credits data={fakeCredits} />
      ) : (
        <Text title={page.data.title[0].text} />
      )}
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

  console.log(paths)

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

  console.log(321, page)

  return {
    props: {
      page,
      pages,
      messages,
    },
  }
}
