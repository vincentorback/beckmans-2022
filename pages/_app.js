import React from 'react'
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import { NextIntlProvider } from 'next-intl'
import withTranslateRoutes from 'next-translate-routes'
import Intro from '../components/Intro'
import '../styles/index.css'

const App = ({ Component, pageProps, router }) => {
  // const [isFirstVisit, setIsFirstVisit] = React.useState(false)

  // React.useEffect(() => {
  //   if (!localStorage.firstVisit) {
  //     setIsFirstVisit(true)
  //     localStorage.firstVisit = false
  //   }
  // }, [])

  // const handleCloseIntro = React.useCallback(() => {
  //   setIsFirstVisit(false)
  // }, [])

  return (
    <NextIntlProvider messages={pageProps.messages}>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <Component {...pageProps} key={router.route} />
        </MotionConfig>
      </LazyMotion>
      {/* {isFirstVisit && <Intro closeIntro={handleCloseIntro} />} */}
    </NextIntlProvider>
  )
}

export default withTranslateRoutes(App)
