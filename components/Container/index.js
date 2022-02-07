import styles from './container.module.css'
import classNames from 'classnames'

const Container = ({ children, size }) => {
  return (
    <div className={classNames(styles.container, styles[size])}>{children}</div>
  )
}

export default Container
