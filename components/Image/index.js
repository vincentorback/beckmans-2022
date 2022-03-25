// import * as prismicH from "@prismicio/helpers"
// const src = prismicH.asImageSrc(prismicDoc.data.example_image, {
//   sat: -100,
// })

import React from 'react'
import NextImage from 'next/image'

const imageLoader = (props) => {
  const { src, width, height, rect } = props

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

    let newSrc = url.toString()

    if (rect) {
      newSrc += `&rect=${rect}`
    }

    return newSrc
  }
}

const Image = (props) => {
  const {
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
        backgroundColor: layout !== 'fill' && 'rgba(0, 0, 0, 0.05)',
        position: 'relative',
        width: layout === 'fill' ? '100%' : 'auto',
        height: layout === 'fill' ? '100%' : 'auto',
      }}
    >
      <NextImage
        {...props}
        loader={() => imageLoader(props)}
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
