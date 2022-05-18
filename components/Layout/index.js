import React from 'react'
import Meta from '../Meta'
import Footer from '../Footer'
import Link from 'next-translate-routes/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Countdown from '../../components/Countdown'
import { IS_PRODUCTION } from '../../lib/constants'

const Layout = ({
  title,
  children,
  background,
  pages,
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
    <div
      className={classNames('Layout', {
        'u-hideOverflow': !project,
      })}
    >
      <Meta title={title} doc={page || project} />
      <div className="Layout-main">{children}</div>
      <Footer pages={pages} settings={settings} />
      {IS_PRODUCTION && !router.isPreview && <Countdown />}
      {router.isPreview && (
        <Link href={'/api/exit-preview'} prefetch={false} scroll={false}>
          <a className={'Layout-previewButton'}>Exit preview</a>
        </Link>
      )}
    </div>
  )
}

export default Layout
