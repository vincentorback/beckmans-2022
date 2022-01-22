import React from 'react'
import Link from "next/link";
import { debounce } from '../../lib/utilities'
import { localeStrings } from '../../lib/constants'
import styles from './footer.module.css'
import { useRouter } from "next/router"

const Footer = ({ pages, children }) => {
  const footerRef = React.useRef(null)
  const router = useRouter()

  React.useEffect(() => {
    const setFooterPush = debounce(() => {
      if (footerRef.current) {
        document.body.style.paddingBottom = `${footerRef.current.offsetHeight}px`
      }
    }, 200)

    window.addEventListener('resize', setFooterPush)

    setFooterPush()

    return () => window.addEventListener('resize', setFooterPush)
  }, [footerRef])

  const otherLocale = router.locales.find(item => item !== router.locale)

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.footerInner}>
        <nav>
          {pages && pages.map(page => (
            <Link href={`/${page.uid}`} key={page.uid}>
              <a>{page.data.title[0].text}</a>
            </Link>
          ))}
          <Link href={router.asPath} locale={otherLocale}>
            <a>{localeStrings[otherLocale].label}</a>
          </Link>
        </nav>
        <div>
          {children}
          {/* <button style={{padding:'1em'}} disabled={isAnimating} onClick={steps}>steps</button>
          <button style={{padding:'1em'}} disabled={isAnimating} onClick={blink}>blink</button>
          <button style={{padding:'1em'}} disabled={isAnimating} onClick={diagonal}>diagonal</button> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer
