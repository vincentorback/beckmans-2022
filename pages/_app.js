import React from 'react'
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  MotionConfig,
} from 'framer-motion'
import Router from 'next/router'
import { NextIntlProvider } from 'next-intl'
import withTranslateRoutes from 'next-translate-routes'
import '../styles/index.css'

const App = ({ Component, pageProps, router }) => {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <LazyMotion features={domAnimation} strict>
        <Component {...pageProps} key={router.asPath} />
        {/* <AnimatePresence
          exitBeforeEnter={false}
          onExitComplete={() =>
            window.requestAnimationFrame(() => window.scrollTo(0, 0))
          }
        >
        </AnimatePresence> */}
      </LazyMotion>
    </NextIntlProvider>
  )
}

export default withTranslateRoutes(App)
