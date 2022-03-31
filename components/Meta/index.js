import { linkResolver } from '../../lib/prismic'
import { useTranslations } from 'next-intl'
import { localeStrings, IS_PRODUCTION } from '../../lib/constants'
import Head from 'next/head'

const Meta = ({ title, alternateLanguages, backgroundColor }) => {
  const t = useTranslations()

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>
        {title && `${title} | `}Beckmans {t('show')} 19.05–24.05.2022
      </title>
      {alternateLanguages?.map((doc) => (
        <link
          key={doc.uid}
          rel="alternate"
          hrefLang={Object.keys(localeStrings).find(
            (locale) => localeStrings[locale] === doc.lang
          )}
          href={linkResolver(doc, true)}
        />
      ))}
      {!IS_PRODUCTION && <meta name="robots" content="noindex, nofollow" />}
      <meta content={`var(--color-${backgroundColor})`} name="theme-color" />
    </Head>
  )
}

export default Meta
