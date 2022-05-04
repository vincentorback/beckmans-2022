import Credits from '../../slices/Credits'
import Text from '../../slices/Text'
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
          if (!slice?.primary?.title && !slice?.primary?.body) return null
          return <Text slice={slice} key={`slice_${sliceIndex}`} />
        }

        if (slice.slice_type === 'credits') {
          if (isEmpty(slice?.items)) return null

          return <Credits key={`slice_${sliceIndex}`} slice={slice} />
        }
      })}
    </m.div>
  )
}

export default Slices
