import React from 'react'
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  MotionConfig,
} from 'framer-motion'
import { NextIntlProvider } from 'next-intl'
import withTranslateRoutes from 'next-translate-routes'
import '../styles/index.css'

const App = ({ Component, pageProps, router }) => {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <LazyMotion features={domAnimation} strict>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </LazyMotion>
    </NextIntlProvider>
  )
}

export default withTranslateRoutes(App)
