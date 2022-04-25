import React from 'react'
import Meta from '../Meta'
import Footer from '../Footer'
import Link from 'next-translate-routes/link'
import { useRouter } from 'next/router'

const Layout = ({
  title,
  children,
  background,
  pages,
  alternatePage,
  settings,
  project,
  page,
}) => {
  const router = useRouter()

  React.useEffect(() => {
    document.documentElement.style.setProperty(
      '--site-background',
      `var(--color-${background ? background.toLowerCase() : 'white'})`
    )

    if (background === 'Black') {
      document.documentElement.style.setProperty(
        '--site-color',
        `var(--color-white)`
      )
    } else {
      document.documentElement.style.setProperty(
        '--site-color',
        `var(--color-black)`
      )
    }

    return () => {
      document.documentElement.style.removeProperty('--site-background')
      document.documentElement.style.removeProperty('--site-color')
    }
  }, [background])

  return (
    <div className="Layout">
      <Meta title={title} alternatePage={alternatePage} doc={page || project} />
      <div className="Layout-main">{children}</div>
      <Footer pages={pages} settings={settings} />
      {router.isPreview && (
        <Link href={'/api/exit-preview'} prefetch={false} scroll={false}>
          <a className={'Layout-previewButton'}>Exit preview</a>
        </Link>
      )}
    </div>
  )
}

export default Layout
