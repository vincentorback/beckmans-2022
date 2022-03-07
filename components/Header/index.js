import React from 'react'
import Link from 'next-translate-routes/link'
import Container from '../Container'
import Menu from '../Menu'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import styles from './header.module.css'
import debounce from 'lodash.debounce'
import classNames from 'classnames'

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
                {t('show')} <br />
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
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <g clipPath="url(#a)">
                      <g clipPath="url(#b)" fill="currentColor">
                        <path d="M170.88 8.93c-1.32.75-2.37 1.16-3.2 1.85a27.16 27.16 0 0 0-3.6 3.57c-1.37 1.7-2.54 3.56-3.8 5.34-.7.97-1.5 1.87-2.1 2.9a264.79 264.79 0 0 0-4.4 8.04c-1.17 2.22-2.25 4.48-3.39 6.7-.91 1.79-1.9 3.53-2.77 5.34a3.31 3.31 0 0 0-.3 1.87c.33 1.9-.7 3.41-2.9 4.02-.96.27-2.53-1.04-2.95-2.42-.64-2.11-.73-3.97.67-6.06 1.69-2.5 2.63-5.49 4.06-8.18 1-1.88 2.32-3.58 3.43-5.41 1.94-3.21 3.77-6.49 5.77-9.68 1.02-1.65 2.22-3.19 3.38-4.74 1.9-2.52 3.88-4.97 5.72-7.52 1.85-2.55 6.47-3.76 9.21-2.4 3.33 1.65 4.13 3.41 3.43 7.22-.32 1.77-.44 3.57-.68 5.36-.08.39-.2.77-.36 1.13-.6 1.6-1.23 3.2-1.82 4.8-.05.14.03.3.1.79.94-.85 1.7-1.63 2.55-2.27 2.04-1.53 4.17-2.92 6.18-4.5a28.02 28.02 0 0 1 11.01-5.1c1.33-.3 2.97-.43 4.17.06 3.74 1.53 3.67 3.94 1.84 7.04a82.52 82.52 0 0 1-5.27 7.76 10.12 10.12 0 0 1-3.2 2.9c-1.55.82-1.48 2.46-2.3 3.6-.83 1.14-.72 2.68-2.69 2.44-.2-.03-.47.35-.61.47-2.3-.86-3.15-2.8-3.74-4.76a3 3 0 0 1 .59-2.33c1.8-2.27 3.74-4.44 5.67-6.6.8-.9 1.71-1.68 2.57-2.51l-.52-.68c-2.1 1.31-4.28 2.55-6.3 3.96a39.43 39.43 0 0 0-5.32 4.18c-3.44 3.39-7.29 6.5-8.84 11.35-.3.98-2.19 1.96-3.2 1.38a11.31 11.31 0 0 1-3.08-2.7c-1.79-2.16-.17-3.91.81-5.84 1.13-2.29 2.1-4.65 2.92-7.07 1.1-3.1 2.1-6.23 2.98-9.4.3-1.05.19-2.25.3-3.9M109.15 23.76c.44-.18.87-.39 1.31-.57 2.36-.95 4.75-1.82 7.06-2.87 1.34-.6 2.52-1.57 3.84-2.25a19.72 19.72 0 0 0 6.56-5.35c.94-1.2 1.49-2.75 2-4.22.33-.94-.28-1.33-1.3-1.37-1.58-.05-3.18-.32-4.77-.44a2.5 2.5 0 0 0-1.29.23c-1.31.7-2.42.04-3.48-.52-.78-.43-.49-1.79.46-2.5 2.16-1.62 4.66-2.78 7.27-2.92a9.18 9.18 0 0 1 7.87 3.48c1.8 2.2 1.32 4.48 1.05 6.84-.27 2.36-1.8 4.04-3.26 5.7a39 39 0 0 1-3.91 3.88c-.68.58-1.66.78-2.45 1.25-3.81 2.32-7.42 5-11.87 6.11-.74.28-1.43.67-2.05 1.17-1.35.9-1.27 2.31.49 3.46 1.5.94 3.12 1.7 4.8 2.27 2.1.76 4.25 1.34 6.39 1.92.76.16 1.53.24 2.3.24 1.65.1 2.14.79 2.18 3.14 0 .86-1.18 1.86-2.26 1.9-2.23.1-4.33-.4-6.5-.97a38.17 38.17 0 0 1-8.94-3.48c-.6-.34-1.01-1.01-1.52-1.53-.61-.62-1.13-1.44-1.88-1.82a4.93 4.93 0 0 1-2.7-3.33 38.08 38.08 0 0 0-2 3.28c-.7 1.43-1.23 2.95-1.83 4.43-.87 2.17-1.76 4.33-2.6 6.51-.46 1.24-.86 2.52-1.26 3.78-.4 1.27-1.05 2.62-1.17 3.95-.2 2.21-.03 4.47-.06 6.7 0 .98.15 1.99-1.05 2.6-2.2 1.18-3.4.9-4.72-1.29-.38-.63-.71-1.29-1.09-1.92-.88-1.5.35-2.74.67-4 1-3.91 2.42-7.72 3.63-11.58.46-1.45.74-2.96 1.23-4.4.49-1.44 1.08-2.76 1.69-4.11 1.68-3.8 3.26-7.63 5.12-11.33 1.4-2.77 3.18-5.34 4.8-8 .71-1.29 1.5-2.54 2.34-3.74a2.25 2.25 0 0 1 1.7-.62c1.3.07 2.56.1 3.81.92 1.17.77 1.47 1.57 1.32 2.76-.13 1.12-.43 2.1-1.61 2.62-.38.16-.63.7-.9 1.08-.1.15-.06.44-.19.57-1.2 1.27-2.43 2.53-3.67 3.79l.37.57M358.89 22.7c-.69.52-1.4.95-2.05 1.5a56.21 56.21 0 0 0-4.68 4.15c-1.68 1.81-3.1 3.87-4.72 5.75-.56.66-1.47 1.04-1.96 1.74-1.5 2.09-2.83 4.3-4.32 6.39a19.03 19.03 0 0 1-2.63 2.95c-.79.73-3.43.12-4.11-.82-1.9-2.61-1.57-4.84.77-6.83a54.3 54.3 0 0 0 4.33-4.3c2.1-2.2 4.05-4.52 6.16-6.7 2.62-2.73 5.32-5.43 8.07-8.04 1.8-1.7 3.8-3.13 6.37-3.47 1.36-.16 4.32 1.79 4.77 3.51.45 1.7.67 3.44.65 5.2-.03 2.52-.47 5.03-.52 7.55 0 1.1.48 2.2.74 3.3l.7-.03c1.5-3.66 2.85-7.42 4.57-10.97a36.92 36.92 0 0 1 4.17-6.27c.33-.43 1.51-.53 2.14-.3a2.3 2.3 0 0 1 1.14 1.62 10.4 10.4 0 0 1-1.16 5.94c-1.37 2.89-2.28 5.98-3.53 8.93-1.12 2.67-2.35 5.3-3.67 7.89-.94 1.86-2.7 1.78-4.01 1.04-3.28-1.92-5.05-5.03-6.53-8.25-.62-1.31-.26-3.09-.29-4.66-.03-2.18 0-4.36 0-6.53l-.4-.3M70.52 24.05c-.33.04-.66.13-.97.26-3.19 1.8-6.23 3.79-8.6 6.63-.84 1-1.78 1.9-2.57 2.92-1.54 2-3.03 4.02-4.49 6.07-.2.3-.13.8-.18 1.2.43.05.93.25 1.3.12.85-.31 1.62-.86 2.47-1.18 3.67-1.42 6.5-4.01 9.48-6.4a72.08 72.08 0 0 0 5.46-5.04c.74-.8 1.43-1.65 2.07-2.53-.95-.56-1.9-1.15-2.86-1.69a6.05 6.05 0 0 0-1.1-.36Zm13.6-1.82c-.36.79-.76 1.74-1.25 2.65-.53 1.02-1.11 2-1.75 2.96-3.23 4.82-7.76 8.29-12.33 11.7-2.3 1.73-4.5 3.59-7.02 4.97-3.4 1.88-6.96 3.65-11.09 2.51a3.31 3.31 0 0 1-1.28-1.07c-1.24-1.38-2.33-2.84-2.5-4.77-.06-.61-.21-1.39.08-1.83a95.9 95.9 0 0 1 9.85-12.72c2.68-2.98 5.65-5.6 9.38-7.24 2.69-1.18 5.3-2.57 8.08-3.48 1.52-.52 3.33-.03 4.96-.31 2.2-.38 2.86 1.52 3.86 2.58.76.82.66 2.46 1.02 4.05ZM8.34 63.02c-.81.35-1.63 1-2.43.97a4.5 4.5 0 0 1-2.57-1.1 2.82 2.82 0 0 1-.95-2.09c.36-2.61.91-5.25 1.48-7.83.6-2.82 1.23-5.6 2.02-8.32.4-1.35.61-2.51-.1-3.84-1.04-2-.8-2.3 1.2-3.38.72-.5 1.28-1.2 1.6-2.02 1.27-2.8 2.43-5.64 3.64-8.47.8-1.87 1.5-3.79 2.4-5.6a106.2 106.2 0 0 1 3.77-6.8 2.29 2.29 0 0 1 2.87-1.02c.99.46 2.62.46 2.66 2.22 0 .18.8.49 1.2.46 1.9-.13 3.82-.56 5.72-.52 3.76.1 7.55.15 11.21 1.23.26.11.49.28.67.49 1.29 1.19 1.3 2.8 1.14 4.31-.14 1.27-1.48 1.44-2.34 1.08-1.84-.79-3.62-.74-5.52-.46-.67.1-1.43-.7-2.14-.68-2.1.05-4.22.1-6.3.92-1.28.52-2.77.52-4.19.76-1.1.18-2.2.32-3.3.57a1.33 1.33 0 0 0-.79.63l-4.72 9.77c-.52 1.08-.12 1.64 1.02 1.42 2.49-.48 4.95-1.05 7.41-1.62.35-.07.69-.16 1.05-.25l5.22-1.2a10 10 0 0 1 1.17-.35c1.49-.14 1.9.37 1.51 1.83-.66 2.6-2.8 3.28-5.01 3.92-2.01.6-4 1.26-5.99 1.9-2.19.69-4.4 1.3-6.54 2.09-1.7.65-3.27 1.41-3.67 3.62-.48 2.6-1.58 5.13-2.01 7.75-.53 3.02-.6 6.12-.88 9.18l.49.4M257.38 55.78c-3.68-.7-4.84-2.61-4.02-6 .87-3.61 1.72-7.24 2.77-10.8.9-3.08 1.97-6.13 3.15-9.11 1.77-4.49 4.56-8.39 7.54-12.17.24-.35.46-.72.65-1.1-2.42 0-4.82-.24-7.14.07-2.41.32-4.76 1.14-7.12 1.82-.73.22-1.42.57-2.03 1.04a3.44 3.44 0 0 1-4.44 0c-2.02-1.47-2.77-3.57-1.87-5.41.32-.64 1.44-1.05 2.27-1.25 2.13-.53 4.3-.99 6.48-1.31 2.73-.45 5.48-.75 8.24-.9 3.04-.09 6.1.24 9.15.25 3.05.02 6.05.97 9.06 1.54 1.61.3 3.34.06 4.9.46 1 .35 1.82 1.07 2.3 2 .47.95-.95 2.92-2.05 2.88a55.9 55.9 0 0 1-7.65-.78c-1.27-.24-2-.04-2.22 1.3-.06.49-.3.94-.66 1.28-5.71 3.66-8.64 9.27-10.96 15.3-1.58 4.09-3.1 8.21-4.49 12.37-.52 1.54-.57 3.22-.9 4.82-.26 1.23-.62 2.43-.95 3.7M328.67 15.27l-.3-.24a3.5 3.5 0 0 0-.4.2l-1.52 1.04c-4.86 3.35-8.57 7.6-10.41 13.3-.23.5-.41 1.03-.57 1.56-.05.3.1.85.3.94a1.46 1.46 0 0 0 1.2-.06c1.04-.7 2.2-1.33 3-2.27a45.35 45.35 0 0 0 7.47-11.88c.37-.88.82-1.73 1.23-2.61v.02Zm-6.7-4.06c-1.57-1.29-1.33-1.45-.3-3.02 1.53-2.29 3.9-1.72 5.93-2.28 2.91-.8 4.55.88 6.54 2.81 2.16 2.1 1.67 3.74.74 5.93-1.63 3.87-2.95 7.89-4.72 11.7-.88 1.88-2.4 3.47-3.71 5.13-1.1 1.38-2.4 2.61-3.44 4-1.04 1.38-2.1 2.32-3.82 2.46-.3.04-.58.17-.81.36-1.96 1.5-5.61.7-7.08-1.22-2.3-3.03-1.6-6.22-.83-9.38 1.23-4.99 4.25-8.95 7.8-12.54 1.26-1.28 2.47-2.6 3.7-3.92M211.66 41.25c-1.57.94-3.2 1.87-4.77 2.84-.66.4-1.2.7-1.99.17-.43-.29-1.12-.16-1.62-.4-.33-.15-.78-.7-.71-.92.46-1.6.27-3.48 1.88-4.64.2-.14.16-.56.26-.85a8.72 8.72 0 0 1 1.91-3.35c1.22-1.22 1.92-3.13 2.44-4.83.48-1.57 2.42-2.78 3.96-2.09 1.62.71 3.31 1.27 4.93 2 2.34 1.04 2.9 3.13 2.84 5.47 0 .2.03.42.06 1 1.86-.31 3.67-.49 5.46-.93 4.61-1.16 9.19-2.45 13.79-3.66a7.06 7.06 0 0 1 2.58-.3c1.31.17 1.48 1.05.73 2.17-1.4 2.03-3.41 3.17-5.62 3.9-2.58.87-5.3 1.47-7.77 2.52-2.02.86-4.2.8-6.11 1.73a2 2 0 0 1-1.02.3c-3.15-.42-4.45 1.71-5.65 4.03-.74 1.42-3.2 2.4-4.67 1.95-1.34-.42-1.87-2.92-.93-4.18.28-.43.52-.89.72-1.36l-.68-.52M307.54 6.56c.18 2.14-.95 3.08-2.46 4.15a18.68 18.68 0 0 0-4.16 4.54c-1.57 2.27-3 4.64-4.28 7.08a70.69 70.69 0 0 0-4.08 8.51 94.11 94.11 0 0 0-2.98 10.17c-.68 2.74-.98 5.58-1.67 8.31-.27 1.05-.76 2.5-2.27 2.4-1.92-.14-3.33-1.32-3.02-2.95.56-2.96.91-5.97 1.61-8.88a78.21 78.21 0 0 1 2.93-9.9c1.73-4.45 3.75-8.8 5.77-13.12a37.06 37.06 0 0 1 4.72-7.45c1.29-1.6 2.46-3.33 3.81-4.91 1.2-1.4 2.24-1.57 3.97-.95 1.62.6 2.47 1.43 2.1 3.02" />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path
                          fill="#f5f1e7"
                          transform="translate(.06)"
                          d="M0 0h379.87v64H0z"
                        />
                      </clipPath>
                      <clipPath id="b">
                        <path
                          fill="#f5f1e7"
                          transform="translate(2.38 .98)"
                          d="M0 0h376.16v63.02H0z"
                        />
                      </clipPath>
                    </defs>
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
                  {t('school-subtitle')}
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
