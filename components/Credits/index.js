import Entry from '../Entry'
import { PrismicRichText } from '@prismicio/react'

const Credits = ({ columns }) => {
  return (
    <div className="Credits">
      <div className="Credits-columns">
        {columns.map((column, columnIndex) => (
          <div className="Credits-column" key={`column_${columnIndex}`}>
            <div className="Credits-columnInner">
              {column.column_title && (
                <h2 className="Credits-title">{column.column_title}</h2>
              )}
              {column.column_text && (
                <Entry>
                  <PrismicRichText field={column.column_text} />
                </Entry>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Credits
