import React from 'react'
import Link from 'next-translate-routes/link'
import Container from '../Container'
import Menu from '../Menu'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import styles from './header.module.css'
import debounce from 'lodash.debounce'
import classNames from 'classnames'
import { SESSION_STARTED } from '../../lib/constants'

const Header = ({ pages, otherLocalePage, children }) => {
  const router = useRouter()
  const t = useTranslations()
  const headerRef = React.useRef(null)
  const otherLocale = router.locales.find((item) => item !== router.locale)
  const [menuIsOpen, setMenuOpen] = React.useState(false)

  const toggleMenu = React.useCallback(() => {
    setMenuOpen((prev) => {
      if (!prev) {
        window.scrollTo(0, 0, {
          behavior: 'smooth',
        })
      }

      return !prev
    })
  }, [])

  React.useEffect(() => {
    document.documentElement.classList.toggle('no-scroll', menuIsOpen)
  }, [menuIsOpen])

  React.useEffect(() => {
    return () => {
      sessionStorage[SESSION_STARTED] = true
    }
  }, [])

  const handleResize = debounce(() => {
    if (headerRef.current) {
      document.documentElement.style.setProperty(
        '--header-height',
        `${headerRef.current.clientHeight}px`
      )
    }
  }, 200)

  const setHeadPush = React.useCallback(
    (push) =>
      window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--header-push', `${push}px`)
      }),
    []
  )

  React.useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (
          window.scrollY +
            document.documentElement.clientHeight +
            headerRef.current.clientHeight >
          document.documentElement.scrollHeight
        ) {
          setHeadPush(
            Math.min(
              Math.abs(
                document.documentElement.scrollHeight -
                  (window.scrollY +
                    document.documentElement.clientHeight +
                    headerRef.current.clientHeight)
              ),
              headerRef.current.clientHeight
            )
          )
        } else {
          setHeadPush(0)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    handleResize()
    handleScroll()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [setHeadPush, handleResize])

  return (
    <>
      <header
        ref={headerRef}
        className={classNames(styles.header, {
          [styles['is-fixed']]: router?.query?.name,
        })}
      >
        <Container>
          <div className={styles.inner}>
            <div className={styles.topLeft}>
              <p>
                {'Graduation Show'} <br />
                {/* 2022-05-24P4D ? */}
                <time dateTime="2022-05-19">19.05</time>–
                <time dateTime="2022-05-24">24.05.2022</time>
              </p>
            </div>
            {children && (
              <div className={styles.bottomLeft}>
                <div>{children}</div>
              </div>
            )}
            <div className={styles.mid}>
              <Link href="/">
                <a>
                  <svg
                    viewBox="0 0 380 64"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M170.9 9c-1.3.7-2.4 1-3.2 1.8a27.2 27.2 0 0 0-3.6 3.5c-1.4 1.7-2.6 3.6-3.8 5.4-.7 1-1.5 1.9-2.1 2.9a264.8 264.8 0 0 0-4.4 8l-3.4 6.7c-1 1.8-2 3.6-2.8 5.4a3.3 3.3 0 0 0-.3 1.8c.3 2-.7 3.4-2.9 4-1 .3-2.5-1-3-2.4-.6-2-.7-4 .7-6 1.7-2.5 2.7-5.5 4.1-8.2 1-1.9 2.3-3.6 3.4-5.4l5.8-9.7c1-1.6 2.2-3.2 3.4-4.7 1.9-2.6 3.9-5 5.7-7.6 1.9-2.5 6.5-3.7 9.2-2.4 3.3 1.7 4.1 3.5 3.4 7.3-.3 1.7-.4 3.5-.6 5.3L176 16l-1.8 4.8v.8l2.6-2.3 6.2-4.5a28 28 0 0 1 11-5.1c1.4-.3 3-.4 4.2 0 3.7 1.6 3.7 4 1.8 7a82.5 82.5 0 0 1-5.2 7.8 10.1 10.1 0 0 1-3.2 3c-1.6.8-1.5 2.4-2.3 3.5-.9 1.2-.8 2.7-2.7 2.5-.2 0-.5.3-.6.4-2.3-.8-3.2-2.8-3.8-4.7a3 3 0 0 1 .6-2.3c1.8-2.3 3.7-4.5 5.7-6.6.8-1 1.7-1.7 2.5-2.6l-.5-.6c-2 1.3-4.3 2.5-6.3 4A39.4 39.4 0 0 0 179 25c-3.4 3.4-7.3 6.5-8.8 11.4-.3 1-2.2 2-3.2 1.3a11.3 11.3 0 0 1-3.1-2.7c-1.8-2.1-.2-3.9.8-5.8a140.4 140.4 0 0 0 5.9-16.5c.3-1 .2-2.2.3-3.9m-61.8 14.9 1.4-.6c2.3-1 4.7-1.8 7-2.9 1.4-.6 2.5-1.6 3.9-2.2a19.7 19.7 0 0 0 6.5-5.4c1-1.2 1.5-2.7 2-4.2.4-1-.3-1.3-1.3-1.4-1.6 0-3.2-.3-4.7-.4a2.5 2.5 0 0 0-1.3.2c-1.3.7-2.5 0-3.5-.5-.8-.4-.5-1.8.4-2.5 2.2-1.6 4.7-2.8 7.3-3a9.2 9.2 0 0 1 7.9 3.6c1.8 2.2 1.3 4.4 1 6.8-.2 2.4-1.8 4-3.2 5.7a39 39 0 0 1-4 3.9c-.6.6-1.6.8-2.4 1.2-3.8 2.3-7.4 5-11.9 6.1-.7.3-1.4.7-2 1.2-1.4 1-1.3 2.3.5 3.5a23 23 0 0 0 4.8 2.2c2 .8 4.2 1.4 6.4 2l2.3.2c1.6.1 2.1.8 2.1 3.1 0 .9-1.1 1.9-2.2 2-2.2 0-4.3-.5-6.5-1a38.2 38.2 0 0 1-9-3.5c-.6-.3-1-1-1.5-1.5-.6-.7-1.1-1.5-1.8-1.9a5 5 0 0 1-2.7-3.3 38 38 0 0 0-2 3.3l-1.9 4.4-2.6 6.5-1.2 3.8c-.4 1.3-1 2.6-1.2 4-.2 2.2 0 4.4 0 6.7 0 1 0 2-1.1 2.6-2.2 1.1-3.4.9-4.7-1.3l-1.1-2c-1-1.4.3-2.7.6-4 1-3.9 2.5-7.7 3.7-11.5.4-1.5.7-3 1.2-4.4.5-1.5 1-2.8 1.7-4.1 1.7-3.8 3.2-7.7 5.1-11.4 1.4-2.7 3.2-5.3 4.8-8l2.3-3.7a2.3 2.3 0 0 1 1.7-.6c1.3 0 2.6 0 3.9.9 1.1.8 1.4 1.6 1.3 2.8-.1 1-.4 2-1.6 2.6-.4.1-.7.7-1 1l-.1.6a260 260 0 0 1-3.7 3.8l.4.6m249.8-1.1-2 1.5a56.2 56.2 0 0 0-4.7 4.2c-1.7 1.8-3.1 3.8-4.8 5.7-.5.7-1.4 1-2 1.7l-4.2 6.4a19 19 0 0 1-2.7 3c-.8.7-3.4.1-4-.8-2-2.6-1.7-4.9.7-6.9a54.3 54.3 0 0 0 4.3-4.3c2.1-2.2 4-4.5 6.2-6.7l8-8c1.8-1.7 3.8-3.1 6.4-3.5 1.4-.1 4.3 1.8 4.8 3.5.4 1.7.7 3.5.6 5.2 0 2.6-.4 5-.5 7.6 0 1 .5 2.2.8 3.3h.7c1.5-3.7 2.8-7.5 4.5-11a37 37 0 0 1 4.2-6.3c.3-.4 1.5-.5 2.1-.3a2.3 2.3 0 0 1 1.2 1.6 10.4 10.4 0 0 1-1.2 6c-1.4 2.9-2.3 6-3.5 8.9-1.1 2.7-2.4 5.3-3.7 7.9-1 1.9-2.7 1.8-4 1-3.3-1.9-5-5-6.5-8.2-.6-1.3-.3-3.1-.3-4.7V23l-.4-.3M70.5 24c-.3 0-.6 0-1 .2A30 30 0 0 0 61 31l-2.5 3-4.5 6c-.2.3-.1.8-.2 1.2.4 0 1 .3 1.3.2.9-.4 1.6-1 2.5-1.2 3.6-1.5 6.5-4 9.5-6.4a72 72 0 0 0 5.4-5l2-2.6-2.8-1.7a6 6 0 0 0-1-.3Zm13.6-1.9L83 25l-1.8 3a49.9 49.9 0 0 1-12.3 11.6c-2.3 1.8-4.5 3.6-7 5-3.4 1.9-7 3.7-11.1 2.5a3.3 3.3 0 0 1-1.3-1c-1.2-1.4-2.3-2.9-2.5-4.8 0-.6-.2-1.4 0-1.9a95.9 95.9 0 0 1 10-12.7c2.6-3 5.6-5.6 9.3-7.2 2.7-1.2 5.3-2.6 8-3.5 1.6-.5 3.4 0 5-.3 2.2-.4 3 1.5 4 2.6.7.8.6 2.4 1 4ZM8.3 63c-.8.4-1.6 1-2.4 1a4.5 4.5 0 0 1-2.6-1.1 2.8 2.8 0 0 1-1-2.1L4 53c.6-2.8 1.2-5.6 2-8.3.4-1.4.6-2.6-.1-3.9-1-2-.8-2.3 1.2-3.4.7-.5 1.3-1.2 1.6-2 1.3-2.8 2.4-5.6 3.6-8.5l2.4-5.6a106.2 106.2 0 0 1 3.8-6.8 2.3 2.3 0 0 1 2.9-1c1 .5 2.6.5 2.6 2.2 0 .2.8.5 1.2.5 2-.1 3.9-.6 5.8-.5 3.7 0 7.5.1 11.2 1.2l.6.5c1.3 1.2 1.3 2.8 1.2 4.3-.2 1.3-1.5 1.5-2.4 1a9.7 9.7 0 0 0-5.5-.4c-.7.1-1.4-.7-2.1-.6-2.1 0-4.2 0-6.3.9-1.3.5-2.8.5-4.2.7L20 24a1.3 1.3 0 0 0-.8.6l-4.7 9.8c-.5 1-.1 1.6 1 1.4l7.4-1.6 1-.2 5.3-1.2a10 10 0 0 1 1.1-.4c1.5-.1 2 .4 1.6 1.8-.7 2.6-2.8 3.3-5 4L21 40l-6.6 2c-1.7.7-3.3 1.5-3.7 3.7-.4 2.6-1.5 5-2 7.7-.5 3-.6 6.1-.8 9.2l.4.4m249-7.2c-3.6-.7-4.8-2.6-4-6l2.8-10.8c1-3.1 2-6.1 3.2-9.1a49 49 0 0 1 8.2-13.3c-2.5 0-4.9-.2-7.2 0-2.4.4-4.7 1.2-7 1.9-.8.2-1.5.6-2.1 1a3.4 3.4 0 0 1-4.5 0c-2-1.4-2.7-3.5-1.8-5.4.3-.6 1.4-1 2.2-1.2a67.6 67.6 0 0 1 14.8-2.2c3-.1 6 .2 9.1.2 3 0 6 1 9 1.5 1.7.3 3.4.1 5 .5 1 .4 1.8 1 2.3 2 .4 1-1 3-2 2.9a55.9 55.9 0 0 1-7.7-.8c-1.3-.2-2 0-2.3 1.3 0 .5-.3 1-.6 1.3a29.3 29.3 0 0 0-11 15.3c-1.6 4-3 8.2-4.5 12.4-.5 1.5-.5 3.2-.9 4.8-.2 1.2-.6 2.4-1 3.7m71.4-40.5-.3-.3a3.5 3.5 0 0 0-.4.2l-1.5 1a25.6 25.6 0 0 0-11 15c0 .2 0 .8.3.9a1.5 1.5 0 0 0 1.2 0c1-.8 2.2-1.4 3-2.4a45.4 45.4 0 0 0 7.4-11.8l1.3-2.7Zm-6.7-4c-1.6-1.4-1.4-1.5-.3-3.1 1.5-2.3 3.9-1.7 5.9-2.3 3-.8 4.5.9 6.5 2.8 2.2 2.1 1.7 3.8.8 6-1.6 3.8-3 7.8-4.7 11.6-1 2-2.4 3.5-3.7 5.2l-3.5 4c-1 1.4-2 2.3-3.8 2.4-.3 0-.6.2-.8.4-2 1.5-5.6.7-7.1-1.2-2.3-3-1.6-6.2-.8-9.4 1.2-5 4.2-9 7.8-12.5l3.7-4m-110.3 30-4.8 2.9c-.7.4-1.2.7-2 .2-.4-.3-1.1-.2-1.6-.4-.4-.2-.8-.7-.7-1 .4-1.6.2-3.4 1.8-4.6.2-.1.2-.6.3-.8a8.7 8.7 0 0 1 2-3.4c1.1-1.2 1.8-3.1 2.4-4.8.4-1.6 2.4-2.8 4-2.1l4.8 2c2.4 1 3 3.1 2.9 5.5v1c2-.4 3.7-.5 5.5-1l13.8-3.6a7 7 0 0 1 2.6-.3c1.3.1 1.5 1 .7 2.1-1.4 2-3.4 3.2-5.6 4-2.6.8-5.3 1.4-7.8 2.5-2 .8-4.2.8-6 1.7a2 2 0 0 1-1.1.3c-3.2-.4-4.5 1.7-5.7 4-.7 1.4-3.2 2.4-4.6 2-1.4-.5-1.9-3-1-4.2l.8-1.4-.7-.5m95.8-34.7c.2 2.1-1 3-2.4 4.1a18.7 18.7 0 0 0-4.2 4.6 68 68 0 0 0-4.3 7 70.7 70.7 0 0 0-4 8.5 94.1 94.1 0 0 0-3 10.2c-.7 2.8-1 5.6-1.7 8.3-.3 1-.7 2.5-2.3 2.4-1.9-.1-3.3-1.3-3-3l1.6-8.8a78.2 78.2 0 0 1 3-10c1.7-4.4 3.7-8.7 5.7-13a37 37 0 0 1 4.8-7.5c1.2-1.6 2.4-3.3 3.8-4.9 1.2-1.4 2.2-1.6 4-1 1.6.7 2.4 1.5 2 3"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div className={styles.topRight}>
              <div>
                {/* <Link
                  href={{
                    pathname: router.asPath,
                    query: router.query,
                  }}
                  locale={otherLocale}
                >
                  <a className={styles.languagleLink}>
                    <svg
                      // className={styles.linkIcon}
                      width={12}
                      height={12}
                      fill="none"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M10.56 9.28a5.67 5.67 0 0 0 0-5.95v-.01a5.7 5.7 0 0 0-9.72 0 5.7 5.7 0 0 0 0 5.96 5.7 5.7 0 0 0 9.72 0Zm-4.13 1.74c-.11.1-.24.2-.37.26a.84.84 0 0 1-.72 0 1.74 1.74 0 0 1-.65-.57 5.1 5.1 0 0 1-.73-1.6 28.88 28.88 0 0 1 3.48 0c-.08.3-.19.58-.31.86-.16.4-.4.75-.7 1.05ZM.65 6.62h2.3c.02.64.09 1.28.2 1.91-.62.06-1.25.13-1.87.23a5.03 5.03 0 0 1-.63-2.14Zm.63-2.78c.62.1 1.25.17 1.88.23-.12.63-.2 1.27-.2 1.91H.65c.04-.75.25-1.48.62-2.14Zm3.7-2.26c.1-.1.23-.2.36-.26a.84.84 0 0 1 .72 0c.26.13.48.33.65.57.33.49.58 1.03.73 1.6a28.89 28.89 0 0 1-3.48 0c.08-.3.19-.58.31-.86.16-.4.4-.75.7-1.05Zm5.77 4.4h-2.3c-.02-.64-.09-1.28-.2-1.91a28.9 28.9 0 0 0 1.87-.23c.37.66.58 1.39.63 2.14ZM3.8 8.48a10.6 10.6 0 0 1-.2-1.86h4.2a10.6 10.6 0 0 1-.2 1.86 29.56 29.56 0 0 0-3.8 0Zm3.8-4.36c.12.61.2 1.23.2 1.86H3.6c0-.63.08-1.25.2-1.86a29.59 29.59 0 0 0 3.8 0Zm.85 2.5h2.3a5.02 5.02 0 0 1-.63 2.14c-.62-.1-1.25-.17-1.88-.23.12-.63.2-1.27.2-1.91Zm1.29-3.37c-.55.08-1.1.14-1.65.19a7.3 7.3 0 0 0-.38-1.08 4.54 4.54 0 0 0-.53-.9c1.02.31 1.92.94 2.56 1.8Zm-7.62-.53a5.06 5.06 0 0 1 2.1-1.26l-.04.05c-.4.58-.7 1.24-.87 1.93-.55-.05-1.1-.11-1.65-.19.14-.18.3-.36.46-.53Zm-.46 6.63c.55-.08 1.1-.14 1.65-.19.1.37.22.73.38 1.08.14.32.32.62.53.9a5.06 5.06 0 0 1-2.56-1.8Zm7.62.53a5.06 5.06 0 0 1-2.1 1.26l.04-.05c.4-.58.7-1.24.87-1.93.55.05 1.1.11 1.65.19-.14.18-.3.36-.46.53Z"
                      />
                    </svg>
                    <span>{t('navigation.otherLanguage')}</span>
                  </a>
                </Link> */}

                <p className={styles.beckmans}>
                  Beckmans <br />
                  College of Design
                </p>
                {/* <button type="button" onClick={toggleMenu}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      y="4"
                      width="4"
                      height="4"
                      transform="rotate(-90 0 4)"
                      fill="currentColor"
                    />
                    <rect
                      y="12.0001"
                      width="4"
                      height="4"
                      transform="rotate(-90 0 12.0001)"
                      fill="currentColor"
                    />
                    <rect
                      y="20"
                      width="4"
                      height="4"
                      transform="rotate(-90 0 20)"
                      fill="currentColor"
                    />
                    <rect
                      x="8"
                      y="4"
                      width="4"
                      height="4"
                      transform="rotate(-90 8 4)"
                      fill="currentColor"
                    />
                    <rect
                      x="8"
                      y="12.0001"
                      width="4"
                      height="4"
                      transform="rotate(-90 8 12.0001)"
                      fill="currentColor"
                    />
                    <rect
                      x="8"
                      y="20"
                      width="4"
                      height="4"
                      transform="rotate(-90 8 20)"
                      fill="currentColor"
                    />
                    <rect
                      x="16"
                      y="4"
                      width="4"
                      height="4"
                      transform="rotate(-90 16 4)"
                      fill="currentColor"
                    />
                    <rect
                      x="16"
                      y="12.0001"
                      width="4"
                      height="4"
                      transform="rotate(-90 16 12.0001)"
                      fill="currentColor"
                    />
                    <rect
                      x="16"
                      y="20"
                      width="4"
                      height="4"
                      transform="rotate(-90 16 20)"
                      fill="currentColor"
                    />
                  </svg>
                </button> */}
              </div>
            </div>
          </div>
        </Container>
      </header>
      <Menu
        isActive={menuIsOpen}
        toggleMenu={toggleMenu}
        pages={pages}
        otherLocalePage={otherLocalePage}
      />
    </>
  )
}

export default Header
