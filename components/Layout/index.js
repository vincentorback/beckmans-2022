import React from 'react'
import Meta from '../Meta'
import Footer from '../Footer'
import styles from './layout.module.css'

const Layout = ({ title, children, background, pages, otherLocalePage }) => {
  const backgroundColor = background ? background.toLowerCase() : 'white'

  React.useEffect(() => {
    document.documentElement.style.backgroundColor = `var(--color-${backgroundColor})`
  }, [backgroundColor])

  return (
    <div className={styles.layout}>
      <Meta title={title}>
        <meta content={`var(--color-${backgroundColor})`} name="theme-color" />
      </Meta>
      <main className={styles.main}>{children}</main>
      <Footer pages={pages} otherLocalePage={otherLocalePage} />
    </div>
  )
}

export default Layout
