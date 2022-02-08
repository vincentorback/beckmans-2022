import Container from '../Container'
import Entry from '../Entry'
import { useTranslations } from 'next-intl'
import { PrismicRichText } from '@prismicio/react'
import { internalLink, externalLink } from '../../lib/prismic'
import styles from './credits.module.css'

const Credits = ({ columns }) => {
  return (
    <div className={styles.credits}>
      <div className={styles.columns}>
        {columns.map((column, columnIndex) => (
          <div className={styles.column} key={`column_${columnIndex}`}>
            {column.column_title && <h2>{column.column_title}</h2>}
            {column.column_text && (
              <Entry>
                <PrismicRichText
                  field={column.column_text}
                  internalLinkComponent={internalLink}
                  externalLinkComponent={externalLink}
                />
              </Entry>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Credits
