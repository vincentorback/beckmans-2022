import Link from 'next-translate-routes/link'
import Container from '../Container'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { localeStrings } from '../../lib/constants'

const Footer = ({ pages }) => {
  const t = useTranslations()
  const router = useRouter()

  return (
    <footer className="Footer">
      <Container>
        <div className="Footer-grid">
          <div className="Footer-item">
            <ul>
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
                      <Link href={`/${page.uid}`} scroll={false}>
                        <a>{page.data.title[0].text}</a>
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>
          <div className="Footer-item">
            <p>
              Beckmans {t('school-subtitle')}
              <br />
              <Link
                href={`https://www.google.se/maps?q=${encodeURIComponent(
                  'Brahegatan 10 114 37 Stockholm'
                )}`}
              >
                <a target="_blank" rel="noopener noreferrer">
                  Brahegatan 10 <br />
                  114 37 Stockholm
                </a>
              </Link>
            </p>
          </div>
          <div className="Footer-item">
            <p>
              {t('show')} 2022 <br />
              19 - 24 {t('may')}
            </p>
          </div>
          <div className="Footer-item">
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
