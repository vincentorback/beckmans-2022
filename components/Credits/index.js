import Container from '../Container'
import Entry from '../Entry'
import { useTranslations } from 'next-intl'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../../lib/prismic'
import styles from './credits.module.css'

const Credits = ({ columns }) => {
  return (
    <div className={styles.credits}>
      <div className={styles.columns}>
        {columns.map((column, columnIndex) => (
          <div className={styles.column} key={`column_${columnIndex}`}>
            {column.column_title && <h2>{column.column_title}</h2>}
            {column.column_text && (
              <Entry>{RichText.render(column.column_text, linkResolver)}</Entry>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Credits
