import React from 'react'
import Entry from '../../components/Entry'
import { PrismicRichText } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers'

const Text = ({ slice, children }) => (
  <div className="Text">
    <div className="Text-title">
      {slice.primary.title && (
        <h1>
          {Array.isArray(slice.primary.title)
            ? prismicH.asText(slice.primary.title)
            : slice.primary.title}
        </h1>
      )}
    </div>
    <div className="Text-body">
      {slice.primary.body && (
        <Entry>
          <PrismicRichText field={slice.primary.body} />
        </Entry>
      )}
      {children && <Entry>{children}</Entry>}
    </div>
  </div>
)

export default Text
