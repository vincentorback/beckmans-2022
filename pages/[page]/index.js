import React from 'react'
import { queryRepeatableDocuments } from '../../lib/content'
import Slices from '../../components/Slices'

export default function Page({ page }) {
  return (
    <>
      <p>{page.name}</p>
      <Slices slices={page.body} doc={page} />
    </>
  )
}

export async function getStaticPaths({ locales }) {
  const content = await queryRepeatableDocuments()
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
  const content = await queryRepeatableDocuments(locale)
  const page = content.find((item) => item.uid === params.page)
  const pages = content.filter((item) => item.type === 'page')
  const messages = require(`../../locales/${locale}.json`)

  if (!page) {
    return {
      notFound: true,
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
