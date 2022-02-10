import { useTranslations } from 'next-intl'
import Link from 'next-translate-routes/link'
import styles from './pagination.module.css'

const Pagination = ({ prev, next }) => {
  const t = useTranslations('navigation')

  if (!prev && !next) return null

  return (
    <nav className={styles.pagination}>
      {prev && (
        <Link href={prev.url}>
          <a className={styles.prev}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
                fill="black"
              />
            </svg>
            <span>{t('previous')} student</span>
          </a>
        </Link>
      )}
      {next && (
        <Link href={next.url}>
          <a className={styles.next}>
            <span>{t('next')} student</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M-6.11959e-07 9L12.17 9L6.58 14.59L8 16L16 8L8 6.99382e-07L6.59 1.41L12.17 7L-7.86805e-07 7L-6.11959e-07 9Z"
                fill="black"
              />
            </svg>
          </a>
        </Link>
      )}
    </nav>
  )
}

export default Pagination
