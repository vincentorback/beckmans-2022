import Entry from '../Entry'
import { PrismicRichText } from '@prismicio/react'
import { internalLink, externalLink } from '../../lib/prismic'

const Text = ({ title, body, children }) => {
  return (
    <div className="Text">
      <div className="Text-title">
        {title && <h1>{Array.isArray(title) ? title[0].text : title}</h1>}
      </div>
      <div className="Text-body">
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
