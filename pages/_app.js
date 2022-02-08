import React from 'react'
import { NextIntlProvider } from 'next-intl'
import withTranslateRoutes from 'next-translate-routes'
import dynamic from 'next/dynamic'
import '../styles/index.css'

// const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
//   ssr: false,
// })

const App = ({ Component, pageProps, router }) => {
  return (
    <>
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
      {/* <AnimatedCursor
        // innerSize={12}
        // outerSize={12}
        color="221, 117, 80"
        // outerAlpha={0.1}
        // innerScale={0.5}
        // outerScale={3}
      /> */}
    </>
  )
}

export default withTranslateRoutes(App)
