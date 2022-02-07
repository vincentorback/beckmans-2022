import React from 'react'
import { NextIntlProvider } from 'next-intl'
import withTranslateRoutes from 'next-translate-routes'
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
      <Component {...pageProps} key={router.route} />
    </NextIntlProvider>
  )
}

export default withTranslateRoutes(App)
