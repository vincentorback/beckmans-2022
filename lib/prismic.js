import * as prismic from '@prismicio/client'
import Link from 'next-translate-routes/link'
import fetch from 'node-fetch'

export const customLink = (type, element, content, children, index) => (
  <Link key={index} href={linkResolver(element.data)}>
    <a>{content}</a>
  </Link>
)

export const linkResolver = (doc) => {
  if (doc.type === 'page') {
    return `/${doc.uid}`
  }

  if (doc.type === 'project') {
    return doc.url
  }

  return '/'
}

const endpoint = prismic.getEndpoint('beckmans2022')
export const client = prismic.createClient(endpoint, { fetch })
