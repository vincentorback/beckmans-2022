import React from 'react'
import Meta from '../Meta'
import Footer from '../Footer'
import Link from 'next-translate-routes/link'
import { useRouter } from 'next/router'

const Layout = ({ title, children, background, pages, alternatePage }) => {
  const router = useRouter()
  const backgroundColor = background ? background.toLowerCase() : 'white'

  return (
    <div className="Layout">
      <Meta
        title={title}
        alternatePage={alternatePage}
        backgroundColor={backgroundColor}
      />
      <div className="Layout-main">{children}</div>
      <Footer pages={pages} />
      {router.isPreview && (
        <Link href={'/api/exit-preview'} prefetch={false} scroll={false}>
          <a className={'Layout-previewButton'}>Exit preview</a>
        </Link>
      )}
    </div>
  )
}

export default Layout
