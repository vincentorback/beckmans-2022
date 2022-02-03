import React from 'react'
import classNames from 'classnames'
import NextImage from 'next/image'

const imageLoader = ({ src, width }) => {
  const url = new URL(src)

  url.searchParams.set('auto', 'compress,format')
  url.searchParams.set('w', width)

  return url.toString()
}

const Image = (props) => {
  const {
    className,
    objectFit,
    objectPosition,
    width,
    height,
    alt,
    quality,
    layout,
  } = props

  const [isLoaded, setLoaded] = React.useState(false)

  return (
    <div
      className={classNames(className, {
        'is-loaded': isLoaded,
      })}
      style={{
        transition: 'opacity 200ms ease 200ms',
        opacity: isLoaded ? 1 : 0,
      }}
    >
      <NextImage
        {...props}
        loader={imageLoader}
        layout={layout || 'intrinsic'}
        objectFit={objectFit || 'cover'}
        objectPosition={objectPosition || '50% 50%'}
        alt={alt || ''}
        width={layout === 'cover' || layout === 'fill' ? null : width}
        height={layout === 'cover' || layout === 'fill' ? null : height}
        quality={quality || 50}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  )
}

export default Image
