import Link from 'next-translate-routes/link'
import Container from '../Container'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { localeStrings } from '../../lib/constants'
import styles from './footer.module.css'

const Footer = ({ pages, otherLocalePage }) => {
  const t = useTranslations()
  const router = useRouter()
  const otherLocale = router.locales.find((item) => item !== router.locale)

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.item}>
            <ul>
              <li key={otherLocale}>
                <Link
                  href={{
                    pathname: otherLocalePage
                      ? otherLocalePage.uid
                      : router.asPath,
                    query: router.query,
                  }}
                  locale={otherLocale}
                >
                  <a className={styles.languagleLink}>
                    <span>{t('navigation.otherLanguage')}</span>
                  </a>
                </Link>
              </li>
              {pages &&
                pages
                  .filter((item) => item.lang === localeStrings[router.locale])
                  .sort((a, b) => {
                    if (a.uid > b.uid) return 1
                    if (a.uid < b.uid) return -1
                    return 0
                  })
                  .map((page) => (
                    <li key={page.uid}>
                      <Link href={`/${page.uid}`}>
                        {page.data.title[0].text}
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>
          <div className={styles.item}>
            <p>
              Beckmans {t('school-subtitle')}
              <br />
              <Link
                href={`https://www.google.se/maps?q=${encodeURIComponent(
                  'Brahegatan 10 114 37 Stockholm'
                )}`}
              >
                <a target="_blank">
                  Brahegatan 10 <br />
                  114 37 Stockholm
                </a>
              </Link>
            </p>
          </div>
          <div className={styles.item}>
            <p>
              {t('show')} 2022 <br />
              19 - 24 {t('may')}
            </p>
          </div>
          <div className={styles.item}>
            <p>
              {t('fashion-show')} <br />
              <time dateTime="2022-05-17">17 {t('may')}</time>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
