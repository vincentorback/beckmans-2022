import React from 'react'
import Entry from '../../components/Entry'
import { PrismicRichText } from '@prismicio/react'

const Credits = ({ slice }) => (
  <div className="Credits">
    <div className="Credits-columns">
      {slice.items.map((column, columnIndex) => (
        <div className="Credits-column" key={`column_${columnIndex}`}>
          <div className="Credits-columnInner">
            {column.columnTitle && (
              <h2 className="Credits-title">{column.columnTitle}</h2>
            )}
            {column.columnBody && (
              <Entry>
                <PrismicRichText field={column.columnBody} />
              </Entry>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default Credits
