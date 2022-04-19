import Credits from '../Credits'
import Text from '../Text'
import { isEmpty } from '../../lib/utilities'
import { m } from 'framer-motion'

const Slices = ({ body }) => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: 0,
        },
      }}
      exit={{
        y: 10,
        opacity: 0,
        transition: {
          duration: 0.5,
          delay: 0.25,
        },
      }}
    >
      {body.map((slice, sliceIndex) => {
        if (slice.slice_type === 'text') {
          if (!slice?.primary?.text_title && !slice?.primary?.text_body)
            return null

          return (
            <Text
              key={`slice_${sliceIndex}`}
              title={slice?.primary?.text_title}
              body={slice?.primary?.text_body}
            />
          )
        }

        if (slice.slice_type === 'credits') {
          if (isEmpty(slice?.items)) return null

          return <Credits key={`slice_${sliceIndex}`} columns={slice.items} />
        }
      })}
    </m.div>
  )
}

export default Slices
