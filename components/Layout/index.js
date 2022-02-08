import React from 'react'
import Meta from '../Meta'
import Footer from '../Footer'
import styles from './layout.module.css'

const Layout = ({ children, background, pages, otherLocalePage }) => {
  const backgroundColor = background
    ? background.toLowerCase()
    : 'var(--color-white)'

  return (
    <div
      className={styles.layout}
      style={{
        backgroundColor: `var(--color-${backgroundColor})`,
      }}
    >
      <Meta>
        <meta content={`var(--color-${backgroundColor}`} name="theme-color" />
      </Meta>
      <main className={styles.main}>{children}</main>
      <Footer pages={pages} otherLocalePage={otherLocalePage} />
    </div>
  )
}

export default Layout
