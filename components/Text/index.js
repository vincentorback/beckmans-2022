import Container from '../Container'
import Entry from '../Entry'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../../lib/prismic'
import styles from './text.module.css'

const Text = ({ title, body, children }) => {
  return (
    <div className={styles.text}>
      <div className={styles.title}>
        {title && <h1>{Array.isArray(title) ? title[0].text : title}</h1>}
      </div>
      <div className={styles.body}>
        {body && <Entry>{RichText.render(body, linkResolver)}</Entry>}
        {children && <Entry>{children}</Entry>}
      </div>
    </div>
  )
}

export default Text
