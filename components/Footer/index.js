import Link from 'next-translate-routes/link'
import styles from './footer.module.css'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

const Footer = ({}) => {
  const router = useRouter()
  const otherLocale = router.locales.find((item) => item !== router.locale)
  const t = useTranslations()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <nav>
          {/* {pages &&
            pages.map((page) => (
              <Link href={`/${page.uid}`} key={page.uid}>
                <a>{page.data.title[0].text}</a>
              </Link>
            ))} */}
          <Link
            href={{
              pathname: router.asPath,
              query: router.query,
            }}
            locale={otherLocale}
          >
            <a>{t('navigation.otherLanguage')}</a>
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
