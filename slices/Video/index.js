import React from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useInView } from 'react-intersection-observer'

// plyr touches `document` at import time, so it can only load in the browser
const Player = dynamic(() => import('./Player'), { ssr: false })

const Video = ({ slice }) => {
  const { width, height, video_id, provider_name, html } =
    slice.primary.embedURL

  const containerRef = React.useRef(null)
  const { ref, inView } = useInView({
    triggerOnce: true,
  })
  const [hasError, setHasError] = React.useState(false)

  const handleError = React.useCallback(() => {
    if (html) {
      containerRef.current.innerHTML = `<div class="Video-inner">${html}</div>`
      setHasError(true)
    }
  }, [html])

  const MemoVideo = React.useMemo(() => {
    if (!provider_name || !video_id) return null

    return (
      <Player
        videoId={video_id}
        providerName={provider_name}
        html={html}
        onError={handleError}
      />
    )
  }, [video_id, provider_name, html, handleError])

  return (
    <div
      ref={containerRef}
      className={classNames('Video', {
        [`is-${provider_name.toLowerCase()}`]: provider_name,
        'is-inView': inView,
        'is-error': hasError,
      })}
      style={{
        '--video-width': `${width}`,
        '--video-height': `${height}`,
      }}
    >
      <div ref={ref} className="Video-inner">
        {MemoVideo}
      </div>
    </div>
  )
}

export default Video
