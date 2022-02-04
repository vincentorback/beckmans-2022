import classNames from 'classnames'
import styles from './filters.module.css'
import { slugify } from '../../lib/utilities'
import { useTranslations } from 'next-intl'

const Filters = ({ filters, activeFilter, onClick }) => {
  const t = useTranslations()

  return (
    <div className={styles.filters}>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onClick(filter)}
          className={classNames(styles.button, {
            [styles['is-active']]: !activeFilter || activeFilter === filter,
          })}
        >
          {t(`categories.${slugify(filter)}`)}
        </button>
      ))}
    </div>
  )
}

export default Filters
