import * as prismic from '@prismicio/client'
import Link from 'next-translate-routes/link'

export const internalLink = ({ children, href, rel, target }) => {
  return (
    <Link href={href}>
      <a rel={rel} target={target}>
        {children}
      </a>
    </Link>
  )
}

export const externalLink = ({ children, href, rel, target }) => {
  return (
    <Link href={href} prefetch={false}>
      <a rel={rel} target={target}>
        {children}
      </a>
    </Link>
  )
}

// export const apiRoutes = [
//   {
//     type: 'page',
//     path: '/:lang?/:uid',
//   },
//   {
//     type: 'project',
//     path: '/:category?/:uid',
//   },
// ]

export const linkResolver = (doc) => {
  if (doc.type === 'page') {
    return `/${doc.uid}`
  }

  if (doc.type === 'project') {
    return `/${slugify(doc.category)}/${doc.uid}}` // doc.url
  }

  return '/'
}

const endpoint = prismic.getEndpoint('beckmans2022')
export const client = prismic.createClient(endpoint)
