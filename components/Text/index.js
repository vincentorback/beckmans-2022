import Container from '../Container'
import Entry from '../Entry'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../../lib/prismic'
import styles from './text.module.css'

const Text = ({ title, body }) => {
  return (
    <div className={styles.text}>
      <div className={styles.title}>{title && <h1>{title[0].text}</h1>}</div>
      <div className={styles.body}>
        {body && <Entry>{RichText.render(body, linkResolver)}</Entry>}
      </div>
    </div>
  )
}

export default Text
