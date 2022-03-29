import NextImage from 'next/image'
import * as prismicH from '@prismicio/helpers'

const imageLoader = (image) => {
  const { width, height, quality, rect } = image

  return prismicH.asImageSrc(image.src, {
    w: width,
    h: height,
    q: quality,
    rect,
  })
}

const Image = (props) => {
  const {
    src,
    hidden,
    objectFit,
    objectPosition,
    width,
    height,
    alt,
    quality,
    layout,
  } = props

  return (
    <div
      style={{
        display: hidden ? 'none' : 'block',
        // backgroundColor: layout !== 'fill' && 'rgba(0, 0, 0, 0.05)',
        position: 'relative',
        width: layout === 'fill' ? '100%' : 'auto',
        height: layout === 'fill' ? '100%' : 'auto',
      }}
    >
      <NextImage
        {...props}
        src={src.url}
        loader={() => imageLoader(props)}
        layout={layout || 'intrinsic'}
        objectFit={objectFit || 'cover'}
        objectPosition={objectPosition || '50% 50%'}
        alt={alt || src.alt || ''}
        width={layout === 'cover' || layout === 'fill' ? null : width}
        height={layout === 'cover' || layout === 'fill' ? null : height}
        quality={quality || 50}
      />
    </div>
  )
}

export default Image
