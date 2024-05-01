import NextImage from 'next/image'
import classNames from 'classnames'

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
    className,
    sizes,
    loadingBackground,
    onLoadingComplete,
    lazyBoundary,
    priority,
  } = props

  layout = layout ?? 'intrinsic'

  return (
    <div
      className={classNames('Image', className, {
        [`Image--${layout}`]: layout,
      })}
      hidden={hidden}
      style={{
        backgroundColor: loadingBackground ?? null,
      }}
    >
      <NextImage
        src={src.url}
        priority={priority}
        sizes={sizes}
        lazyBoundary={lazyBoundary}
        loader={(image) => imageLoader(image, props)}
        layout={layout}
        objectFit={objectFit || 'cover'}
        objectPosition={objectPosition || '50% 50%'}
        alt={alt || src.alt || ''}
        width={layout === 'cover' || layout === 'fill' ? null : width}
        height={layout === 'cover' || layout === 'fill' ? null : height}
        quality={quality || 60}
        onLoadingComplete={onLoadingComplete}
      />
    </div>
  )
}

export default Image
