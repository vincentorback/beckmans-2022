import React from 'react'
import Image from '../Image'
import { windowImageProps } from './Window'

const CONCURRENCY = 3
const FALLBACK_INTERVAL = 800

// Warms the browser cache for the Window hover images by rendering them
// hidden with the exact same props as Window, a few at a time.
const Preload = ({ items }) => {
  const images = React.useMemo(
    () => items.filter((item) => item?.data?.main_image?.url),
    [items]
  )

  const [count, setCount] = React.useState(CONCURRENCY)

  const handleLoad = React.useCallback(() => {
    setCount((c) => c + 1)
  }, [])

  // Keep the queue moving even if an image errors and never fires load
  React.useEffect(() => {
    if (count >= images.length) return

    const interval = window.setInterval(handleLoad, FALLBACK_INTERVAL)
    return () => window.clearInterval(interval)
  }, [count, images.length, handleLoad])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        visibility: 'hidden',
      }}
    >
      {images.slice(0, count).map((item) => (
        <Image
          key={item.uid}
          {...windowImageProps}
          src={item.data.main_image}
          priority
          alt=""
          onLoadingComplete={handleLoad}
        />
      ))}
    </div>
  )
}

export default Preload
