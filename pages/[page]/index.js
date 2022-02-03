import React from 'react'
import { queryRepeatableDocuments } from '../../lib/content'
// import { localeStrings } from '../../lib/constants'
// import Slices from '../../components/Slices'

export default function Page({ page }) {
  return (
    <>
      <p>{page.data.title[0].text}</p>
      {/* <Slices slices={page.body} doc={page} /> */}
    </>
  )
}

export async function getStaticPaths({}) {
  // const content = await queryRepeatableDocuments()
  // const pages = content.filter((item) => item.type === 'page')
  // const paths = []

  // locales.forEach((locale) => {
  //   pages.forEach((page) => {
  //     console.log(page.lang, localeStrings[locale].prismicCode)
  //     if (page.lang === localeStrings[locale].prismicCode) {
  //       paths.push({
  //         params: {
  //           page: page.uid,
  //         },
  //         locale,
  //       })
  //     }
  //   })
  // })

  return {
    paths: [],
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
