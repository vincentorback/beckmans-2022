import Link from 'next/link'
import Container from '../Container'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import styles from './footer.module.css'

const Footer = ({ pages }) => {
  const t = useTranslations()
  const router = useRouter()
  const otherLocale = router.locales.find((item) => item !== router.locale)

  return (
    <footer className={styles.footer}>
      <Container size="lg">
        <div className={styles.grid}>
          <div className={styles.item}>
            <ul>
              <li>
                <Link
                  href={{
                    pathname: router.asPath,
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
              Beckmans Designhögskola <br />
              <Link
                href={`https://www.google.se/maps?q=${encodeURIComponent(
                  'Brahegatan 10 114 37 Stockholm'
                )}`}
              >
                <a target="_blank">
                  Brahegatan 10 <br /> 114 37 Stockholm
                </a>
              </Link>
            </p>
          </div>
          <div className={styles.item}>
            <p>
              Examensutställning 2022 <br />
              19 - 24 maj
            </p>
          </div>
          <div className={styles.item}>
            <p>
              Modevisning <br />
              17 maj
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
