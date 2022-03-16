import React from 'react'
import Meta from '../Meta'
import Header from '../Header'
import Footer from '../Footer'
import styles from './layout.module.css'

const Layout = ({ title, children, background, pages, otherLocalePage }) => {
  const backgroundColor = background ? background.toLowerCase() : 'white'

  return (
    <div className={styles.layout}>
      <Meta title={title} otherLocalePage={otherLocalePage}>
        <meta content={`var(--color-${backgroundColor})`} name="theme-color" />
      </Meta>
      <div className={styles.main}>{children}</div>
      <Footer pages={pages} otherLocalePage={otherLocalePage} />
    </div>
  )
}

export default Layout
