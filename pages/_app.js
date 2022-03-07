import React from 'react'
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import { NextIntlProvider } from 'next-intl'
import withTranslateRoutes from 'next-translate-routes'
import '../styles/index.css'

const App = ({ Component, pageProps, router }) => {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <Component {...pageProps} key={router.route} />
        </MotionConfig>
      </LazyMotion>
    </NextIntlProvider>
  )
}

export default withTranslateRoutes(App)
