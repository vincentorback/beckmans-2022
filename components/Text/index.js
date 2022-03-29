import Entry from '../Entry'
import { PrismicRichText } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers'

const Text = ({ title, body, children }) => {
  return (
    <div className="Text">
      <div className="Text-title">
        {title && (
          <h1>{Array.isArray(title) ? prismicH.asText(title) : title}</h1>
        )}
      </div>
      <div className="Text-body">
        {body && (
          <Entry>
            <PrismicRichText field={body} />
          </Entry>
        )}
        {children && <Entry>{children}</Entry>}
      </div>
    </div>
  )
}

export default Text
