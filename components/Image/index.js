import NextImage from 'next/image'

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
        loader={(image) => imageLoader(image, props)}
        layout={layout || 'intrinsic'}
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
