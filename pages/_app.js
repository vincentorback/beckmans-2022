import { NextIntlProvider } from 'next-intl'
import withTranslateRoutes from 'next-translate-routes'
import Layout from '../components/Layout'
import '../styles/index.css'

const App = ({ Component, pageProps, router }) => {
  return (
    <NextIntlProvider
      messages={pageProps.messages}
      now={new Date(pageProps.now)}
      timeZone="Europe/Stockholm"
      formats={{
        dateTime: {
          short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          },
        },
      }}
    >
      <Layout {...pageProps} router={router}>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </NextIntlProvider>
  )
}

export default withTranslateRoutes(App)
