import React from 'react'
import Link from 'next-translate-routes/link'
import Container from '../Container'
import { useRouter } from 'next/router'
import { capitalize } from '../../lib/utilities'
import { linkResolver } from '../../lib/prismic'
import { m } from 'framer-motion'

const LocaleLink = ({ locale, isActive, url }) => {
  if (isActive) {
    return (
      <div className="Header-languageLink">
        <span className="Header-languageLinkText">{capitalize(locale)}</span>
      </div>
    )
  }

  return (
    <Link href={url} locale={locale} scroll={false}>
      <a className="Header-languageLink" lang={locale}>
        <span className="Header-languageLinkText">{capitalize(locale)}</span>
      </a>
    </Link>
  )
}

const Header = ({ children, project, page, setFilter, sessionStarted }) => {
  const router = useRouter()

  const doc = React.useMemo(() => page ?? project, [page, project])
  const otherLangDoc = doc?.alternate_languages?.length
    ? doc?.alternate_languages[0]
    : false

  const LanguageLinks = React.useMemo(() => {
    return (
      <div className="Header-languageLinks">
        {router.locales.map((locale) => {
          const url =
            locale === router.locale
              ? null
              : otherLangDoc || doc
              ? linkResolver(otherLangDoc ?? doc)
              : router.isReady
              ? router.asPath
              : '/'

          return (
            <LocaleLink
              key={locale}
              locale={locale}
              isActive={locale === router.locale}
              url={url}
            />
          )
        })}
      </div>
    )
  }, [
    doc,
    otherLangDoc,
    router.asPath,
    router.locale,
    router.locales,
    router.isReady,
  ])

  return (
    <header className="Header">
      <Container>
        <div className="Header-inner">
          <m.div
            className="Header-topLeft"
            animate={sessionStarted ? 'visible' : 'hidden'}
            initial={sessionStarted ? 'visible' : 'hidden'}
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/" scroll={false}>
              <a>
                <p className="Header-showText">
                  <span lang="en">Graduation Show</span> <br />
                  <time dateTime="2022-05-19">19.05</time>–
                  <time dateTime="2022-05-24">24.05.2022</time>
                </p>
              </a>
            </Link>
          </m.div>

          <m.div
            className="Header-mid"
            animate={sessionStarted ? 'visible' : 'hidden'}
            initial={sessionStarted ? 'visible' : 'hidden'}
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" scroll={false}>
              <m.a
                className="Header-logo"
                onClick={setFilter ? () => setFilter() : null}
                animate={sessionStarted ? 'visible' : 'hidden'}
                initial={sessionStarted ? 'visible' : 'hidden'}
                variants={{
                  visible: { opacity: 1 },
                  hidden: { opacity: 0 },
                }}
              >
                <svg
                  className="Header-logoSymbol"
                  viewBox="0 0 380 64"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M170.9 9c-1.3.7-2.4 1-3.2 1.8a27.2 27.2 0 0 0-3.6 3.5c-1.4 1.7-2.6 3.6-3.8 5.4-.7 1-1.5 1.9-2.1 2.9a264.8 264.8 0 0 0-4.4 8l-3.4 6.7c-1 1.8-2 3.6-2.8 5.4a3.3 3.3 0 0 0-.3 1.8c.3 2-.7 3.4-2.9 4-1 .3-2.5-1-3-2.4-.6-2-.7-4 .7-6 1.7-2.5 2.7-5.5 4.1-8.2 1-1.9 2.3-3.6 3.4-5.4l5.8-9.7c1-1.6 2.2-3.2 3.4-4.7 1.9-2.6 3.9-5 5.7-7.6 1.9-2.5 6.5-3.7 9.2-2.4 3.3 1.7 4.1 3.5 3.4 7.3-.3 1.7-.4 3.5-.6 5.3L176 16l-1.8 4.8v.8l2.6-2.3 6.2-4.5a28 28 0 0 1 11-5.1c1.4-.3 3-.4 4.2 0 3.7 1.6 3.7 4 1.8 7a82.5 82.5 0 0 1-5.2 7.8 10.1 10.1 0 0 1-3.2 3c-1.6.8-1.5 2.4-2.3 3.5-.9 1.2-.8 2.7-2.7 2.5-.2 0-.5.3-.6.4-2.3-.8-3.2-2.8-3.8-4.7a3 3 0 0 1 .6-2.3c1.8-2.3 3.7-4.5 5.7-6.6.8-1 1.7-1.7 2.5-2.6l-.5-.6c-2 1.3-4.3 2.5-6.3 4A39.4 39.4 0 0 0 179 25c-3.4 3.4-7.3 6.5-8.8 11.4-.3 1-2.2 2-3.2 1.3a11.3 11.3 0 0 1-3.1-2.7c-1.8-2.1-.2-3.9.8-5.8a140.4 140.4 0 0 0 5.9-16.5c.3-1 .2-2.2.3-3.9m-61.8 14.9 1.4-.6c2.3-1 4.7-1.8 7-2.9 1.4-.6 2.5-1.6 3.9-2.2a19.7 19.7 0 0 0 6.5-5.4c1-1.2 1.5-2.7 2-4.2.4-1-.3-1.3-1.3-1.4-1.6 0-3.2-.3-4.7-.4a2.5 2.5 0 0 0-1.3.2c-1.3.7-2.5 0-3.5-.5-.8-.4-.5-1.8.4-2.5 2.2-1.6 4.7-2.8 7.3-3a9.2 9.2 0 0 1 7.9 3.6c1.8 2.2 1.3 4.4 1 6.8-.2 2.4-1.8 4-3.2 5.7a39 39 0 0 1-4 3.9c-.6.6-1.6.8-2.4 1.2-3.8 2.3-7.4 5-11.9 6.1-.7.3-1.4.7-2 1.2-1.4 1-1.3 2.3.5 3.5a23 23 0 0 0 4.8 2.2c2 .8 4.2 1.4 6.4 2l2.3.2c1.6.1 2.1.8 2.1 3.1 0 .9-1.1 1.9-2.2 2-2.2 0-4.3-.5-6.5-1a38.2 38.2 0 0 1-9-3.5c-.6-.3-1-1-1.5-1.5-.6-.7-1.1-1.5-1.8-1.9a5 5 0 0 1-2.7-3.3 38 38 0 0 0-2 3.3l-1.9 4.4-2.6 6.5-1.2 3.8c-.4 1.3-1 2.6-1.2 4-.2 2.2 0 4.4 0 6.7 0 1 0 2-1.1 2.6-2.2 1.1-3.4.9-4.7-1.3l-1.1-2c-1-1.4.3-2.7.6-4 1-3.9 2.5-7.7 3.7-11.5.4-1.5.7-3 1.2-4.4.5-1.5 1-2.8 1.7-4.1 1.7-3.8 3.2-7.7 5.1-11.4 1.4-2.7 3.2-5.3 4.8-8l2.3-3.7a2.3 2.3 0 0 1 1.7-.6c1.3 0 2.6 0 3.9.9 1.1.8 1.4 1.6 1.3 2.8-.1 1-.4 2-1.6 2.6-.4.1-.7.7-1 1l-.1.6a260 260 0 0 1-3.7 3.8l.4.6m249.8-1.1-2 1.5a56.2 56.2 0 0 0-4.7 4.2c-1.7 1.8-3.1 3.8-4.8 5.7-.5.7-1.4 1-2 1.7l-4.2 6.4a19 19 0 0 1-2.7 3c-.8.7-3.4.1-4-.8-2-2.6-1.7-4.9.7-6.9a54.3 54.3 0 0 0 4.3-4.3c2.1-2.2 4-4.5 6.2-6.7l8-8c1.8-1.7 3.8-3.1 6.4-3.5 1.4-.1 4.3 1.8 4.8 3.5.4 1.7.7 3.5.6 5.2 0 2.6-.4 5-.5 7.6 0 1 .5 2.2.8 3.3h.7c1.5-3.7 2.8-7.5 4.5-11a37 37 0 0 1 4.2-6.3c.3-.4 1.5-.5 2.1-.3a2.3 2.3 0 0 1 1.2 1.6 10.4 10.4 0 0 1-1.2 6c-1.4 2.9-2.3 6-3.5 8.9-1.1 2.7-2.4 5.3-3.7 7.9-1 1.9-2.7 1.8-4 1-3.3-1.9-5-5-6.5-8.2-.6-1.3-.3-3.1-.3-4.7V23l-.4-.3M70.5 24c-.3 0-.6 0-1 .2A30 30 0 0 0 61 31l-2.5 3-4.5 6c-.2.3-.1.8-.2 1.2.4 0 1 .3 1.3.2.9-.4 1.6-1 2.5-1.2 3.6-1.5 6.5-4 9.5-6.4a72 72 0 0 0 5.4-5l2-2.6-2.8-1.7a6 6 0 0 0-1-.3Zm13.6-1.9L83 25l-1.8 3a49.9 49.9 0 0 1-12.3 11.6c-2.3 1.8-4.5 3.6-7 5-3.4 1.9-7 3.7-11.1 2.5a3.3 3.3 0 0 1-1.3-1c-1.2-1.4-2.3-2.9-2.5-4.8 0-.6-.2-1.4 0-1.9a95.9 95.9 0 0 1 10-12.7c2.6-3 5.6-5.6 9.3-7.2 2.7-1.2 5.3-2.6 8-3.5 1.6-.5 3.4 0 5-.3 2.2-.4 3 1.5 4 2.6.7.8.6 2.4 1 4ZM8.3 63c-.8.4-1.6 1-2.4 1a4.5 4.5 0 0 1-2.6-1.1 2.8 2.8 0 0 1-1-2.1L4 53c.6-2.8 1.2-5.6 2-8.3.4-1.4.6-2.6-.1-3.9-1-2-.8-2.3 1.2-3.4.7-.5 1.3-1.2 1.6-2 1.3-2.8 2.4-5.6 3.6-8.5l2.4-5.6a106.2 106.2 0 0 1 3.8-6.8 2.3 2.3 0 0 1 2.9-1c1 .5 2.6.5 2.6 2.2 0 .2.8.5 1.2.5 2-.1 3.9-.6 5.8-.5 3.7 0 7.5.1 11.2 1.2l.6.5c1.3 1.2 1.3 2.8 1.2 4.3-.2 1.3-1.5 1.5-2.4 1a9.7 9.7 0 0 0-5.5-.4c-.7.1-1.4-.7-2.1-.6-2.1 0-4.2 0-6.3.9-1.3.5-2.8.5-4.2.7L20 24a1.3 1.3 0 0 0-.8.6l-4.7 9.8c-.5 1-.1 1.6 1 1.4l7.4-1.6 1-.2 5.3-1.2a10 10 0 0 1 1.1-.4c1.5-.1 2 .4 1.6 1.8-.7 2.6-2.8 3.3-5 4L21 40l-6.6 2c-1.7.7-3.3 1.5-3.7 3.7-.4 2.6-1.5 5-2 7.7-.5 3-.6 6.1-.8 9.2l.4.4m249-7.2c-3.6-.7-4.8-2.6-4-6l2.8-10.8c1-3.1 2-6.1 3.2-9.1a49 49 0 0 1 8.2-13.3c-2.5 0-4.9-.2-7.2 0-2.4.4-4.7 1.2-7 1.9-.8.2-1.5.6-2.1 1a3.4 3.4 0 0 1-4.5 0c-2-1.4-2.7-3.5-1.8-5.4.3-.6 1.4-1 2.2-1.2a67.6 67.6 0 0 1 14.8-2.2c3-.1 6 .2 9.1.2 3 0 6 1 9 1.5 1.7.3 3.4.1 5 .5 1 .4 1.8 1 2.3 2 .4 1-1 3-2 2.9a55.9 55.9 0 0 1-7.7-.8c-1.3-.2-2 0-2.3 1.3 0 .5-.3 1-.6 1.3a29.3 29.3 0 0 0-11 15.3c-1.6 4-3 8.2-4.5 12.4-.5 1.5-.5 3.2-.9 4.8-.2 1.2-.6 2.4-1 3.7m71.4-40.5-.3-.3a3.5 3.5 0 0 0-.4.2l-1.5 1a25.6 25.6 0 0 0-11 15c0 .2 0 .8.3.9a1.5 1.5 0 0 0 1.2 0c1-.8 2.2-1.4 3-2.4a45.4 45.4 0 0 0 7.4-11.8l1.3-2.7Zm-6.7-4c-1.6-1.4-1.4-1.5-.3-3.1 1.5-2.3 3.9-1.7 5.9-2.3 3-.8 4.5.9 6.5 2.8 2.2 2.1 1.7 3.8.8 6-1.6 3.8-3 7.8-4.7 11.6-1 2-2.4 3.5-3.7 5.2l-3.5 4c-1 1.4-2 2.3-3.8 2.4-.3 0-.6.2-.8.4-2 1.5-5.6.7-7.1-1.2-2.3-3-1.6-6.2-.8-9.4 1.2-5 4.2-9 7.8-12.5l3.7-4m-110.3 30-4.8 2.9c-.7.4-1.2.7-2 .2-.4-.3-1.1-.2-1.6-.4-.4-.2-.8-.7-.7-1 .4-1.6.2-3.4 1.8-4.6.2-.1.2-.6.3-.8a8.7 8.7 0 0 1 2-3.4c1.1-1.2 1.8-3.1 2.4-4.8.4-1.6 2.4-2.8 4-2.1l4.8 2c2.4 1 3 3.1 2.9 5.5v1c2-.4 3.7-.5 5.5-1l13.8-3.6a7 7 0 0 1 2.6-.3c1.3.1 1.5 1 .7 2.1-1.4 2-3.4 3.2-5.6 4-2.6.8-5.3 1.4-7.8 2.5-2 .8-4.2.8-6 1.7a2 2 0 0 1-1.1.3c-3.2-.4-4.5 1.7-5.7 4-.7 1.4-3.2 2.4-4.6 2-1.4-.5-1.9-3-1-4.2l.8-1.4-.7-.5m95.8-34.7c.2 2.1-1 3-2.4 4.1a18.7 18.7 0 0 0-4.2 4.6 68 68 0 0 0-4.3 7 70.7 70.7 0 0 0-4 8.5 94.1 94.1 0 0 0-3 10.2c-.7 2.8-1 5.6-1.7 8.3-.3 1-.7 2.5-2.3 2.4-1.9-.1-3.3-1.3-3-3l1.6-8.8a78.2 78.2 0 0 1 3-10c1.7-4.4 3.7-8.7 5.7-13a37 37 0 0 1 4.8-7.5c1.2-1.6 2.4-3.3 3.8-4.9 1.2-1.4 2.2-1.6 4-1 1.6.7 2.4 1.5 2 3"
                    fill="currentColor"
                  />
                </svg>
              </m.a>
            </Link>
          </m.div>
          <m.div
            className="Header-topRight"
            animate={sessionStarted ? 'visible' : 'hidden'}
            initial={sessionStarted ? 'visible' : 'hidden'}
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="Header-beckmans" lang="en">
              <Link href="https://beckmans.se">
                <a target="_blank">
                  Beckmans <br />
                  College of Design
                </a>
              </Link>
            </p>
          </m.div>
          <m.div
            className="Header-bottomRight u-printHide"
            animate={sessionStarted ? 'visible' : 'hidden'}
            initial={sessionStarted ? 'visible' : 'hidden'}
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.3 + 0.3 }}
          >
            {LanguageLinks}
          </m.div>
          {children && (
            <m.div className="Header-bottomLeft">
              <div>{children}</div>
            </m.div>
          )}
        </div>
      </Container>
    </header>
  )
}

export default Header
