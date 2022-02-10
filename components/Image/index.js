import React from 'react'
import classNames from 'classnames'
import NextImage from 'next/image'

const imageLoader = ({ src, width, height }) => {
  if (src.startsWith('/')) {
    return src
  } else {
    const url = new URL(src)

    url.searchParams.set('auto', 'compress,format')

    if (width) {
      url.searchParams.set('w', width)
    }

    if (height) {
      url.searchParams.set('h', height)
    }

    return url.toString()
  }
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
      style={{
        backgroundColor: layout !== 'fill' && 'rgba(0, 0, 0, 0.05)',
        position: 'relative',
        width: layout === 'fill' ? '100%' : 'auto',
        height: layout === 'fill' ? '100%' : 'auto',
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
      />
    </div>
  )
}

export default Image
