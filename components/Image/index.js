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
      style={{
        backgroundColor: layout !== 'fill' && 'var(--color-blue)',
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
