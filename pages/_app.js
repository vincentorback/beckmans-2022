import { NextIntlProvider } from 'next-intl'
import withTranslateRoutes from 'next-translate-routes'
import '../styles/index.css'

const App = ({ Component, pageProps, router }) => (
  <NextIntlProvider messages={pageProps.messages}>
    <Component {...pageProps} key={router.route} />
  </NextIntlProvider>
)

export default withTranslateRoutes(App)
