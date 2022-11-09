import React from 'react'
import classNames from 'classnames'
import { slugify } from '../../lib/utilities'
import { useTranslations } from 'next-intl'
import { m } from 'framer-motion'

const Filters = ({ isReady, filters, activeFilter, onChange }) => {
  const t = useTranslations('categories')

  const variants = React.useMemo(
    () => ({
      hidden: (index) => ({
        opacity: 0,
        y: '50%',
        transition: {
          duration: 0.2,
          delay: 0.5 + 0.2 * index,
        },
      }),
      enter: (index) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.2,
          delay: 0.5 + 0.2 * index,
        },
      }),
      exit: (index) => ({
        opacity: 0,
        y: '-50%',
        transition: {
          duration: 0.2,
          delay: 0.2 * index,
        },
      }),
    }),
    []
  )

  return (
    <div className="Filters">
      {filters.map((filter) => (
        <button
          className={classNames('Filters-button', {
            'is-active': activeFilter === filter,
          })}
          aria-pressed={activeFilter === filter}
          key={filter}
          onClick={() => onChange(filter)}
        >
          <m.span
            className="Filters-buttonText"
            variants={variants}
            initial="hidden"
            animate={isReady ? 'enter' : 'hidden'}
            exit="exit"
          >
            {t(slugify(filter))}
          </m.span>
        </button>
      ))}
    </div>
  )
}

export default Filters
