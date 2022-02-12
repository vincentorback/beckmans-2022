import styles from './container.module.css'
import classNames from 'classnames'

const Container = ({ ref, children }) => {
  return (
    <div ref={ref} className={styles.container}>
      {children}
    </div>
  )
}

export default Container
