import React from 'react'
// import Transition from '../Transition'
import styles from './layout.module.css'
// import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  // const router = useRouter()

  return (
    <div className={styles.layout}>
      {/* <Transition location={router.pathname}> */}
      <main className={styles.main}>{children}</main>
      {/* </Transition> */}
      {/* <Footer pages={pages} /> */}
    </div>
  )
}

export default Layout
