import React from 'react'
import Link from 'next-translate-routes/link'
import styles from './header.module.css'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

const Header = () => {
  const router = useRouter()
  const otherLocale = router.locales.find((item) => item !== router.locale)
  const t = useTranslations()

  React.useEffect(() => {
    const changeStart = () => {
      console.log('changeStart')
    }

    router.events.on('routeChangeStart', changeStart)

    return () => router.events.off('routeChangeStart', changeStart)
  }, [router.events])

  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <h1 className={styles.title}>Formation</h1>
        </a>
      </Link>
      <nav>
        {/* <div>
          <p>Beckmans Designhögskola</p>
          <p>
            <a
              href="http://maps.google.com/?q=Brahegatan+10+114+37+Stockholm+SE"
              target="_blank"
              rel="noreferrer"
            >
              Brahegatan 10 <br />
              114 37 Stockholm
            </a>
          </p>
        </div>
        <div>
          <p>Examensutställning</p>
          <p>19–24 maj</p>
        </div>
        <div>
          <p>Modevisning</p>
          <p>17 maj</p>
        </div> */}
        <div>
          <p>
            <Link
              href={{
                pathname: router.asPath,
                query: router.query,
              }}
              locale={otherLocale}
            >
              <a>{t('navigation.otherLanguage')}</a>
            </Link>
          </p>
        </div>
      </nav>
    </header>
  )
}

export default Header
