import Container from '../Container'
import Entry from '../Entry'
import { useTranslations } from 'next-intl'
import { PrismicRichText } from '@prismicio/react'
import { internalLink, externalLink } from '../../lib/prismic'

const Credits = ({ columns }) => {
  return (
    <div className="Credits">
      <div className="Credits-columns">
        {columns.map((column, columnIndex) => (
          <div className="Credits-column" key={`column_${columnIndex}`}>
            {column.column_title && (
              <h2 className="Credits-title">{column.column_title}</h2>
            )}
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
