import React from 'react'
import Meta from '../Meta'
import Footer from '../Footer'
import Link from 'next-translate-routes/link'
import { useRouter } from 'next/router'

const Layout = ({ title, children, background, pages, alternatePage }) => {
  const [isDiabled, setDisabled] = React.useState(false)

  const router = useRouter()
  const backgroundColor = background ? background.toLowerCase() : 'white'

  React.useEffect(() => {
    const handleRouteChangeStart = (url, { shallow }) => {
      setDisabled(!shallow)
    }

    const handleRouteChangeComplete = () => {
      setDisabled(false)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router])

  React.useEffect(() => {
    document.documentElement.style.backgroundColor = `var(--color-${backgroundColor})`

    return () => {
      document.documentElement.style.backgroundColor = `var(--color-white)`
    }
  }, [backgroundColor])

  return (
    <div
      className="Layout"
      style={{
        pointerEvents: isDiabled ? 'none' : null,
      }}
    >
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
