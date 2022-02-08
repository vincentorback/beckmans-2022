import Container from '../Container'
import Entry from '../Entry'
import { PrismicRichText } from '@prismicio/react'
import { internalLink, externalLink } from '../../lib/prismic'
import styles from './text.module.css'

const Text = ({ title, body, children }) => {
  return (
    <div className={styles.text}>
      <div className={styles.title}>
        {title && <h1>{Array.isArray(title) ? title[0].text : title}</h1>}
      </div>
      <div className={styles.body}>
        {body && (
          <Entry>
            <PrismicRichText
              field={body}
              internalLinkComponent={internalLink}
              externalLinkComponent={externalLink}
            />
          </Entry>
        )}
        {children && <Entry>{children}</Entry>}
      </div>
    </div>
  )
}

export default Text
