import React from 'react'
import Meta from '../Meta'
import styles from './layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Meta />
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Layout
