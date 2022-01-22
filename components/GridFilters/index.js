import classNames from "classnames"
import styles from './gridfilters.module.css'
import { slugify } from "../../lib/utilities"

const GridFilters = ({ filters, activeFilter, onClick }) => {
  return (
    <div className={styles.filters}>
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onClick(filter)}
          className={classNames(styles.button, {
            [styles['is-active']]: !activeFilter || activeFilter === filter
          })}
        >{filter}</button>
      ))}
    </div>
  )
}

export default GridFilters
