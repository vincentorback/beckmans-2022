import React from 'react'
import Link from 'next-translate-routes/link'
import Container from '../Container'
import { useTranslations } from 'next-intl'
import { PrismicText } from '@prismicio/react'
import { linkResolver } from '../../lib/prismic'
import LinkWrap from '../LinkWrap'

const Footer = ({ pages, settings }) => {
  const t = useTranslations()

  const MemoFooter = React.useMemo(
    () => (
      <footer className="Footer">
        <Container>
          <div className="Footer-grid">
            <div className="Footer-item">
              <ul className="Footer-nav">
                {pages &&
                  pages.map((page) => (
                    <li className="Footer-navItem" key={page.uid}>
                      <Link
                        href={page?.url ?? linkResolver(page)}
                        scroll={false}
                      >
                        <a target={page?.url ? '_blank' : null}>
                          {page?.data?.title?.length ? (
                            <PrismicText field={page.data.title} />
                          ) : (
                            page.title
                          )}
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
                <LinkWrap href={settings?.show_link}>
                  {t('show')} <br />
                  19 – 24 {t('may')} 2022
                </LinkWrap>
              </p>
            </div>
            <div className="Footer-item">
              <p>
                <LinkWrap href={settings?.fashion_link}>
                  {t('fashion-show')} <br />
                  <time dateTime="2022-05-17">17 {t('may')} 2022</time>
                </LinkWrap>
              </p>
            </div>
          </div>
        </Container>
      </footer>
    ),
    [t, pages]
  )

  return MemoFooter
}

export default Footer
