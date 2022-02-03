import React from 'react'
import Transition from '../Transition'
import Header from '../Header'
import styles from './layout.module.css'

const Layout = ({ children, router }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <Transition location={router.pathname}>
        <main className={styles.main}>{children}</main>
      </Transition>
      {/* <Footer pages={pages} /> */}
    </div>
  )
}

export default Layout
