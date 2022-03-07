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
              },
              enter: {
                opacity: 1,
                y: 0,
              },
              exit: {
                opacity: 0,
                y: '-50%',
              },
            }}
            initial="hidden"
            animate={isReady ? 'enter' : 'hidden'}
            exit="exit"
            transition={{
              type: 'ease',
              delay: reduceMotion ? 0 : 0.5 + 0.1 * filterIndex,
            }}
          >
            {t(slugify(filter))}
          </m.div>
        </button>
      ))}
    </div>
  )
}

export default Filters
