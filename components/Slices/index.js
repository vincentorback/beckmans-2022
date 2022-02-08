import Credits from '../Credits'
import Text from '../Text'

const Slices = ({ body }) => {
  return (
    <>
      {body.map((slice) => {
        if (slice.slice_type === 'text') {
          if (!slice?.primary?.text_title && !slice?.primary?.text_body)
            return null
          return (
            <Text
              title={slice?.primary?.text_title}
              body={slice?.primary?.text_body}
            />
          )
        }

        if (slice.slice_type === 'credits') {
          if (!slice.items || !slice.items.length) return null
          return <Credits columns={slice.items} />
        }
      })}
    </>
  )
}

export default Slices
