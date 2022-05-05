import Entry from '../../components/Entry'
import { PrismicRichText } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers'

const Text = ({ slice, title, body, children }) => {
  const textTitle = title ?? slice?.primary?.title
  const textBody = body ?? slice?.primary?.body

  return (
    <div className="Text">
      <div className="Text-title">
        {textTitle && (
          <h1>
            {Array.isArray(textTitle) ? prismicH.asText(textTitle) : textTitle}
          </h1>
        )}
      </div>
      <div className="Text-body">
        {textBody && (
          <Entry>
            <PrismicRichText field={textBody} />
          </Entry>
        )}
        {children && <Entry>{children}</Entry>}
      </div>
    </div>
  )
}

export default Text
