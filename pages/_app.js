import React from 'react'
import Link from 'next-translate-routes/link'
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { NextIntlProvider } from 'next-intl'
import withTranslateRoutes from 'next-translate-routes'
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { linkResolver, repositoryName } from '../lib/prismic'
import { clamp } from '../lib/utilities'
import jump from 'jump.js'
import '../styles/index.css'

const App = ({ Component, pageProps, router }) => {
  React.useEffect(() => {
    window.requestAnimationFrame(() => {
      document.documentElement.style.transition = 'background-color 200ms ease'
    })
  }, [])

  React.useEffect(() => {
    const handleRouteStart = () => {
      window.requestAnimationFrame(() => {
        if (window.scrollY < 5) return

        if (window?.CSS?.supports('scroll-behavior', 'smooth')) {
          window.scroll({ top: 0, left: 0, behavior: 'smooth' })
        } else {
          jump(document.documentElement, {
            duration: (distance) => clamp(200, Math.abs(distance) * 0.5, 500),
          })
        }
      })
    }

    router.events.on('routeChangeStart', handleRouteStart)

    return () => router.events.off('routeChangeStart', handleRouteStart)
  }, [router])

  return (
    <NextIntlProvider
      messages={pageProps?.messages ?? {}}
      onError={() => {}}
      getMessageFallback={() => ''}
    >
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={({ href, children, ...props }) => (
          <Link href={href} scroll={false}>
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
