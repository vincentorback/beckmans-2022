import React from 'react'
import Link from 'next-translate-routes/link'
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  MotionConfig,
} from 'framer-motion'
import Router from 'next/router'
import { NextIntlProvider } from 'next-intl'
import withTranslateRoutes from 'next-translate-routes'
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { linkResolver, repositoryName } from '../lib/prismic'
import '../styles/index.css'

const App = ({ Component, pageProps, router }) => {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={({ href, children, ...props }) => (
          <Link href={href}>
            <a {...props}>{children}</a>
          </Link>
        )}
      >
        <PrismicPreview repositoryName={repositoryName}>
          <LazyMotion features={domAnimation} strict>
            <AnimatePresence
              exitBeforeEnter
              onExitComplete={() =>
                window.requestAnimationFrame(() => window.scrollTo(0, 0))
              }
            >
              <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
          </LazyMotion>
        </PrismicPreview>
      </PrismicProvider>
    </NextIntlProvider>
  )
}

export default withTranslateRoutes(App)
