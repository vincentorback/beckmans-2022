import styles from './container.module.css'
import classNames from 'classnames'

const Container = ({ ref, children, size }) => {
  return (
    <div ref={ref} className={classNames(styles.container, styles[size])}>
      {children}
    </div>
  )
}

export default Container
