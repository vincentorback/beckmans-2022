import { linkResolver } from '../../lib/prismic'
import { useTranslations } from 'next-intl'
import { localeStrings, IS_PRODUCTION } from '../../lib/constants'
import Head from 'next/head'

const colors = {
  black: '#000',
  blue: '#a6b7d5',
  white: '#f5f1e7',
  red: '#dd7550',
}

const Meta = ({ title, alternatePage, backgroundColor }) => {
  const t = useTranslations()
  const backgroundColorHex = colors[backgroundColor]

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>
        {title && `${title} | `}Beckmans {t('show')} 19.05–24.05.2022
      </title>

      {alternatePage && (
        <link
          key={alternatePage.uid}
          rel="alternate"
          hrefLang={Object.keys(localeStrings).find(
            (locale) => localeStrings[locale] === alternatePage.lang
          )}
          href={linkResolver(alternatePage)}
        />
      )}

      {!IS_PRODUCTION && <meta name="robots" content="noindex, nofollow" />}

      <meta name="theme-color" content={backgroundColorHex} />

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
      <meta name="msapplication-TileColor" content="#f5f1e7" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
    </Head>
  )
}

export default Meta
