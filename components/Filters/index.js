import classNames from 'classnames'
import styles from './filters.module.css'
import { slugify } from '../../lib/utilities'
import { useTranslations } from 'next-intl'
import { m, useReducedMotion } from 'framer-motion'

const Filters = ({ isReady, filters, activeFilter, onClick }) => {
  const t = useTranslations('categories')

  const reduceMotion = useReducedMotion()

  return (
    <div className={styles.filters}>
      {filters.map((filter, filterIndex) => (
        <button
          aria-pressed={activeFilter === filter}
          key={filter}
          onClick={() => onClick(filter)}
          className={classNames(styles.button, {
            [styles['is-active']]: activeFilter === filter,
          })}
        >
          <m.div
            variants={{
              hidden: {
                opacity: 0,
                y: '50%',
                transition: {
                  delay: reduceMotion ? 0 : 0.5 + 0.1 * filterIndex,
                },
              },
              enter: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: reduceMotion ? 0 : 0.5 + 0.1 * filterIndex,
                },
              },
              exit: {
                opacity: 0,
                y: '-50%',
                transition: {
                  delay: reduceMotion ? 0 : 0.1 * filterIndex,
                },
              },
            }}
            initial="hidden"
            animate={isReady ? 'enter' : 'hidden'}
            exit="exit"
          >
            {t(slugify(filter))}
          </m.div>
        </button>
      ))}
    </div>
  )
}

export default Filters
