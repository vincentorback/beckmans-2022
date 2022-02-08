import { useTranslations } from 'next-intl'
import Head from 'next/head'

const Meta = ({ title, children }) => {
  const t = useTranslations()

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,viewport-fit=cover"
      />
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>
        {title && `${title} - `}Beckmans {t('show')} 2022
      </title>
      {/* TODO: <meta name="description" content="" />
      <meta property="og:image" content="" />
      <meta property="og:title" content="Beckmans" /> */}
      {children}
    </Head>
  )
}

export default Meta
