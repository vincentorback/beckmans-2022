import React from "react"
import Link from "next/link"
import { queryRepeatableDocuments } from '../../lib/content'
import Person from '../../components/Person'
import Footer from '../../components/Footer'

export default function Page({ pages, page }) {
  return (
    <div>
      <p>{page.data.title[0].text}</p>
      {/* <div>{page.body}</div> */}
      <Footer pages={pages}>
        <p>{page.data.title[0].text}</p>
      </Footer>
    </div>
  )
}

export async function getStaticPaths ({ locales, preview }) {
  const content = await queryRepeatableDocuments()
  const pages = content.filter(item => item.type === 'page')

  const paths = pages.map(page => ({
    params: {
      page: page.uid
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params, locale, preview }) {
  const content = await queryRepeatableDocuments(locale)
  const page = content.find(item => item.uid === params.page)
  const pages = content.filter(item => item.type === 'page')

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page,
      pages,
    },
  }
}
