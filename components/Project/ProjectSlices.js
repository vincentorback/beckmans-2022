import classNames from 'classnames'
import Video from '../../slices/Video'
import Image from '../Image'

/**
 * @url https://www.prismic.io/docs/reactjs/0.13/api-reference/slice-types/video
 * @author Vincent Orback
 * @param { items } param - array of items to be rendered
 * @returns React.Component
 */
const Media = ({ items }) => {
  return (
    <div className="Project-media">
      {items.map((slice, sliceIndex) => {
        if (slice.slice_type === 'video') {
          if (!slice?.primary?.embedURL?.provider_name) return null
          return <Video key={sliceIndex} slice={slice} />
        }

        if (slice.slice_type === 'images') {
          if (!slice?.items.length) return null
          const images = slice.items.filter((item) => item.image.url)
          if (!images?.length) return null

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
                  lazyBoundary="100%"
                  loadingBackground="rgba(0, 0, 0, 0.01)"
                  layout="responsive"
                  sizes={
                    images.length === 1
                      ? '(min-width: 1400px) 800px, (min-width: 800px) 50vw, 100vw'
                      : '(min-width: 1400px) 385px, (min-width: 800px) 25vw, (min-width: 400px) 50vw, 100vw'
                  }
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
