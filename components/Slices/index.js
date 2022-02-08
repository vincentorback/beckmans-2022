import Credits from '../Credits'
import Text from '../Text'

const Slices = ({ body }) => {
  return (
    <>
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
          if (!slice.items || !slice.items.length) return null
          return <Credits key={`slice_${sliceIndex}`} columns={slice.items} />
        }
      })}
    </>
  )
}

export default Slices
