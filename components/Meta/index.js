import { linkResolver } from '../../lib/prismic'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { IS_PRODUCTION } from '../../lib/constants'
import Head from 'next/head'

const Meta = ({ title, otherLocalePage, backgroundColor }) => {
  const t = useTranslations()
  const router = useRouter()
  const otherLocale = router.locales.find((item) => item !== router.locale)

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>
        {title && `${title} | `}Beckmans {t('show')} 19.05–24.05.2022
      </title>
      {otherLocalePage && (
        <link
          rel="alternate"
          hrefLang={otherLocale}
          href={linkResolver(otherLocalePage, true)}
        />
      )}
      {!IS_PRODUCTION && <meta name="robots" content="noindex, nofollow" />}
      <meta content={`var(--color-${backgroundColor})`} name="theme-color" />
    </Head>
  )
}

export default Meta
