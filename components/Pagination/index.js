import { useTranslations } from 'next-intl'
import { linkResolver } from '../../lib/prismic'
import Link from 'next-translate-routes/link'

const Pagination = ({ prev, next }) => {
  const t = useTranslations('navigation')

  if (!prev?.uid && !next?.uid) return null

  return (
    <nav className="Pagination">
      {prev && (
        <Link href={linkResolver(prev)} prefetch={false} scroll={false}>
          <a className="Pagination-link Pagination-link--prev">
            <svg
              className="Pagination-linkSymbol"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M16 7H3.8l5.6-5.6L8 0 0 8l8 8 1.4-1.4L3.8 9H16V7Z"
                fill="currentColor"
              />
            </svg>
            <span className="Pagination-linkText">{t('previous')} student</span>
          </a>
        </Link>
      )}
      {next && (
        <Link href={linkResolver(next)} scroll={false}>
          <a className="Pagination-link Pagination-link--next">
            <span className="Pagination-linkText">{t('next')} student</span>
            <svg
              className="Pagination-linkSymbol"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M0 9h12.2l-5.6 5.6L8 16l8-8-8-8-1.4 1.4L12.2 7H0v2Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </Link>
      )}
    </nav>
  )
}

export default Pagination
