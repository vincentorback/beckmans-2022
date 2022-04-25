import * as prismicH from '@prismicio/helpers'
import { linkResolver } from '../lib/prismic'
import { getEverything } from '../lib/content'
import { SITE_URL, defaultLocale, localeStrings } from '../lib/constants'

function generateSiteMap({ locales, pages, projects }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${SITE_URL}</loc>
    <priority>1.0</priority>
    <xhtml:link href="${SITE_URL}" hreflang="x-default" rel="alternate"/>
    ${locales
      ?.map(
        (locale) =>
          `<xhtml:link href="${SITE_URL}" hreflang="${locale}" rel="alternate"/>`
      )
      .join('')}
  </url>
${projects
  .map(
    (doc) => `
  <url>
    <loc>${`${SITE_URL}${linkResolver(doc)}`}</loc>
    <lastmod>${prismicH
      .asDate(doc.last_publication_date)
      .toLocaleDateString('sv-SE')}</lastmod>
    <priority>0.8</priority>
    <xhtml:link href="${SITE_URL}${linkResolver(
      doc
    )}" hreflang="x-default" rel="alternate"/>
    <xhtml:link href="${SITE_URL}${linkResolver(
      doc
    )}" hreflang="${defaultLocale}" rel="alternate"/>
    ${
      doc?.alternate_languages?.length
        ? doc?.alternate_languages
            .map(
              (altDoc) =>
                `<xhtml:link href="${SITE_URL}${linkResolver(
                  altDoc,
                  true
                )}" hreflang="${Object.keys(localeStrings).find(
                  (locale) => localeStrings[locale] === altDoc.lang
                )}" rel="alternate"/>`
            )
            .join('')
        : ''
    }
  </url>
  `
  )
  .join('')}
${pages
  ?.filter((page) => page?.last_publication_date)
  ?.map(
    (doc) => `
  <url>
    <loc>${`${SITE_URL}${linkResolver(doc)}`}</loc>
    <lastmod>${prismicH
      .asDate(doc.last_publication_date)
      .toLocaleDateString('sv-SE')}</lastmod>
    <priority>0.5</priority>
    <xhtml:link href="${SITE_URL}${linkResolver(
      doc
    )}" hreflang="x-default" rel="alternate"/>
    <xhtml:link href="${SITE_URL}${linkResolver(
      doc
    )}" hreflang="${defaultLocale}" rel="alternate"/>
    ${doc?.alternate_languages
      .map(
        (altDoc) =>
          `<xhtml:link href="${SITE_URL}${linkResolver(
            altDoc,
            true
          )}" hreflang="${Object.keys(localeStrings).find(
            (locale) => localeStrings[locale] === altDoc.lang
          )}" rel="alternate"/>`
      )
      .join('')}
  </url>
  `
  )
  .join('')}
</urlset>
 `
}

function SiteMap() {}

export async function getServerSideProps({ res, locales }) {
  const content = await getEverything(defaultLocale)

  const sitemap = generateSiteMap({
    pages: content.pages,
    projects: content.projects,
    locales,
  })

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
