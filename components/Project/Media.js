import classNames from 'classnames'
import Video from '../Video'
import Image from '../Image'

const Media = ({ items }) => {
  return (
    <div className="Project-media">
      {items.map((slice, sliceIndex) => {
        if (slice.slice_type === 'video') {
          if (!slice?.primary?.embed_url?.provider_name) return null
          return <Video key={sliceIndex} {...slice.primary.embed_url} />
        }

        if (slice.slice_type === 'image') {
          if (!slice?.items.length) return null
          const images = slice.items.filter((item) => item.image.url)
          if (!images.length) return null

          return (
            <div
              key={sliceIndex}
              className={classNames('Project-mediaGrid', {
                'is-single': images.length === 1,
              })}
            >
              {images.map((item, itemIndex) => (
                <Image
                  key={itemIndex}
                  src={item.image}
                  alt=""
                  width={item.image.dimensions.width}
                  height={item.image.dimensions.height}
                />
              ))}
            </div>
          )
        }
      })}
    </div>
  )
}

export default Media
