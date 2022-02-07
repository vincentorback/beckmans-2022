import styles from './entry.module.css'

const Entry = ({ children }) => {
  return <div className={styles.entry}>{children}</div>
}

export default Entry
