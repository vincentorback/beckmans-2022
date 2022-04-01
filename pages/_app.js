import React from 'react'
import Link from 'next-translate-routes/link'
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { NextIntlProvider } from 'next-intl'
import withTranslateRoutes from 'next-translate-routes'
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { linkResolver, repositoryName } from '../lib/prismic'
import { clamp, easeInOutExpo } from '../lib/utilities'
import jump from 'jump.js'
import '../styles/index.css'

const App = ({ Component, pageProps, router }) => {
  React.useEffect(() => {
    window.requestAnimationFrame(() => {
      document.documentElement.style.transition = 'background-color 400ms ease'
    })
  }, [])

  React.useEffect(() => {
    const handleRouteChange = () => {
      window.requestAnimationFrame(() => {
        jump(document.documentElement, {
          duration: (distance) => clamp(400, Math.abs(distance), 700),
          easing: easeInOutExpo,
        })
      })
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [router])

  return (
    <NextIntlProvider messages={pageProps.messages}>
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={({ href, children, ...props }) => (
          <Link href={href} scroll={false}>
            <a {...props}>{children}</a>
          </Link>
        )}
        externalLinkComponent={({ href, children, ...props }) => (
          <Link href={href}>
            <a {...props}>{children}</a>
          </Link>
        )}
      >
        <PrismicPreview repositoryName={repositoryName}>
          <LazyMotion features={domAnimation} strict>
            <AnimatePresence exitBeforeEnter>
              <Component
                {...pageProps}
                key={`${router.locale}_${router.asPath}`}
              />
            </AnimatePresence>
          </LazyMotion>
        </PrismicPreview>
      </PrismicProvider>
    </NextIntlProvider>
  )
}

export default withTranslateRoutes(App)
