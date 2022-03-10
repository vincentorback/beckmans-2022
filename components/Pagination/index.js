import { useTranslations } from 'next-intl'
import Link from 'next-translate-routes/link'
import styles from './pagination.module.css'

const Pagination = ({ prev, next }) => {
  const t = useTranslations('navigation')

  if (!prev?.url && !next?.url) return null

  return (
    <nav className={styles.pagination}>
      {prev && (
        <Link href={prev.url} prefetch={false}>
          <a className={styles.prev}>
            <svg
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
            <span>{t('previous')} student</span>
          </a>
        </Link>
      )}
      {next && (
        <Link href={next.url} prefetch={false}>
          <a className={styles.next}>
            <span>{t('next')} student</span>
            <svg
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
