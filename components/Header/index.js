import React from 'react'
import Link from 'next/link'
import styles from './header.module.css'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()

  React.useEffect(() => {
    const changeStart = () => {
      console.log('changeStart')
    }

    router.events.on('routeChangeStart', changeStart)

    return () => router.events.off('routeChangeStart', changeStart)
  }, [])

  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <h1 className={styles.title}>Formation</h1>
        </a>
      </Link>
      <nav>
        <div>
          <p>Beckmans Designhögskola</p>
          <p>
            <a
              href="http://maps.google.com/?q=Brahegatan+10+114+37+Stockholm+SE"
              target="_blank"
            >
              Brahegatan 10 <br />
              114 37 Stockholm
            </a>
          </p>
        </div>
        <div>
          <p>Examensutställning</p>
          <p>19–24 maj</p>
        </div>
        <div>
          <p>
            <a href="#/">Modevisning</a>
          </p>
          <p>17 maj</p>
        </div>
      </nav>
    </header>
  )
}

export default Header
