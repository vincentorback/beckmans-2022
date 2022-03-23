import React from 'react'
import Meta from '../Meta'
import Header from '../Header'
import Footer from '../Footer'

const Layout = ({ title, children, background, pages, otherLocalePage }) => {
  const backgroundColor = background ? background.toLowerCase() : 'white'

  return (
    <div className="Layout">
      <Meta title={title} otherLocalePage={otherLocalePage}>
        <meta content={`var(--color-${backgroundColor})`} name="theme-color" />
      </Meta>
      <div className="Layout-main">{children}</div>
      <Footer pages={pages} otherLocalePage={otherLocalePage} />
    </div>
  )
}

export default Layout
