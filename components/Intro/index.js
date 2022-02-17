import React from 'react'
import classNames from 'classnames'
import styles from './intro.module.css'

const Intro = ({ closeIntro }) => {
  React.useEffect(() => {
    console.log(document.documentElement)
    document.documentElement.classList.add('no-scroll')

    return () => {
      localStorage.firstVisit = false
      document.documentElement.classList.remove('no-scroll')
    }
  }, [])

  return (
    <div className={styles.intro}>
      <p>hej</p>
      <button onClick={closeIntro}>Close intro</button>
    </div>
  )
}

export default Intro
