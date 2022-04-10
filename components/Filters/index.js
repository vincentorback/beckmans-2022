import classNames from 'classnames'
import { slugify } from '../../lib/utilities'
import { useTranslations } from 'next-intl'
import { m, useReducedMotion } from 'framer-motion'

const Filters = ({ isReady, filters, activeFilter, onChange }) => {
  const t = useTranslations('categories')

  const reduceMotion = useReducedMotion()

  return (
    <div className="Filters">
      {filters.map((filter, filterIndex) => (
        <button
          aria-pressed={activeFilter === filter}
          key={filter}
          onClick={() => onChange(filter)}
          className={classNames('Filters-button', {
            'is-active': activeFilter === filter,
          })}
        >
          <m.div
            variants={{
              hidden: {
                opacity: 0,
                y: '50%',
                transition: {
                  duration: 0.2,
                  delay: reduceMotion ? 0 : 0.5 + 0.2 * filterIndex,
                },
              },
              enter: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.2,
                  delay: reduceMotion ? 0 : 0.5 + 0.2 * filterIndex,
                },
              },
              exit: {
                opacity: 0,
                y: '-50%',
                transition: {
                  duration: 0.2,
                  delay: reduceMotion ? 0 : 0.2 * filterIndex,
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
