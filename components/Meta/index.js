import { linkResolver } from '../../lib/prismic'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Meta = ({ title, children, otherLocalePage }) => {
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
      {/* TODO: <meta name="description" content="" />
      <meta property="og:image" content="" />
      <meta property="og:title" content="Beckmans" />
    */}
      {otherLocalePage && (
        <link
          rel="alternate"
          hrefLang={otherLocale}
          href={linkResolver(otherLocalePage, true)}
        />
      )}
      {children}
    </Head>
  )
}

export default Meta
