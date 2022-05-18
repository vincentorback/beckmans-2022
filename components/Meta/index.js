import { linkResolver } from '../../lib/prismic'
import { useTranslations } from 'next-intl'
import { localeStrings, IS_PRODUCTION, SITE_URL } from '../../lib/constants'
import { slugify } from '../../lib/utilities'
import * as prismicH from '@prismicio/helpers'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Meta = ({ title, doc }) => {
  const router = useRouter()
  const t = useTranslations()

  if (doc?.data?.name && doc?.data?.category) {
    title = `${prismicH.asText(doc.data.name)} - ${t(
      `categories.${slugify(doc.data.category)}`
    )}`
  }

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>
        {title && `${title} | `}Beckmans {t('strings.show')} 19.05–24.05.2022
      </title>

      {doc?.alternate_languages?.length ? (
        <link
          key={doc.alternate_languages[0].uid}
          rel="alternate"
          hrefLang={Object.keys(localeStrings).find(
            (locale) =>
              localeStrings[locale] === doc.alternate_languages[0].lang
          )}
          href={linkResolver(doc.alternate_languages[0], true)}
        />
      ) : (
        !doc?.alternate_languages &&
        !title && (
          <link
            rel="alternate"
            hrefLang={Object.keys(localeStrings).find(
              (locale) => localeStrings[locale] === router.locale
            )}
            href={linkResolver(
              {
                lang: Object.keys(localeStrings).find(
                  (locale) => locale !== router.locale
                ),
              },
              true
            )}
          />
        )
      )}

      {doc && (
        <link
          rel="canonical"
          href={(SITE_URL + linkResolver(doc)).replace(/\/+$/, '')}
        />
      )}

      {doc?.data?.main_image?.url && (
        <meta property="og:image" content={doc.data.main_image.url} />
      )}
      <meta property="og:image" content="/images/share.jpg" />

      {!IS_PRODUCTION && <meta name="robots" content="noindex, nofollow" />}

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      />
      <link rel="manifest" href="/icons/site.webmanifest" />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#000" />
      <link rel="shortcut icon" href="/icons/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
      <link rel="icon" type="image/png" href="/icons/favicon.png" />
      <meta name="msapplication-TileColor" content="#f5f1e7" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
    </Head>
  )
}

export default Meta
