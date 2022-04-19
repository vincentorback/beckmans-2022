import NextImage from 'next/image'
import className from 'classnames'

const imageLoader = (image, props) => {
  const url = new URL(image.src)

  url.searchParams.set('auto', 'compress,format')
  url.searchParams.set('w', image.width)
  url.searchParams.set('q', image.quality)

  if (props.rect) {
    url.searchParams.set('rect', props.rect)
  }

  return url.toString()
}

const Image = (props) => {
  let {
    src,
    objectFit,
    objectPosition,
    width,
    height,
    alt,
    hidden,
    quality,
    layout,
  } = props

  layout = layout ?? 'intrinsic'

  return (
    <div
      className={className('Image', {
        [`Image--${layout}`]: layout,
      })}
      hidden={hidden}
    >
      <NextImage
        {...props}
        src={src.url}
        loader={(image) => imageLoader(image, props)}
        layout={layout}
        objectFit={objectFit || 'cover'}
        objectPosition={objectPosition || '50% 50%'}
        alt={alt || src.alt || ''}
        width={layout === 'cover' || layout === 'fill' ? null : width}
        height={layout === 'cover' || layout === 'fill' ? null : height}
        quality={quality || 70}
      />
    </div>
  )
}

export default Image
