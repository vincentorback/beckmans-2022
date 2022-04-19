import classNames from 'classnames'
import Link from 'next-translate-routes/link'
import Container from '../Container'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { localeStrings } from '../../lib/constants'
import { PrismicText } from '@prismicio/react'

const Footer = ({ pages }) => {
  const t = useTranslations()
  const router = useRouter()

  return (
    <footer className="Footer">
      <Container>
        <div className="Footer-grid">
          <div className="Footer-item">
            <ul className="Footer-nav">
              {pages &&
                pages
                  .filter((item) => item.lang === localeStrings[router.locale])
                  .map((page) => (
                    <li
                      className={classNames('Footer-navItem', {
                        'is-active': page.slugs.includes(router.query.page),
                      })}
                      key={page.uid}
                    >
                      <Link href={`/${page.uid}`} scroll={false}>
                        <a>
                          <PrismicText field={page.data.title} />
                        </a>
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
              <Link href="https://www.facebook.com">
                <a>
                  {t('show')} <br />
                  19 – 24 {t('may')} 2022
                </a>
              </Link>
            </p>
          </div>
          <div className="Footer-item">
            <p>
              <Link href="https://www.facebook.com">
                <a>
                  {t('fashion-show')} <br />
                  <time dateTime="2022-05-17">17 {t('may')} 2022</time>
                </a>
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
