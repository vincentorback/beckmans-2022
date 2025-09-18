import React from 'react'
import classNames from 'classnames'
import { useInView } from 'react-intersection-observer'
import { getYoutubeID } from '../../lib/utilities'

const Video = ({ slice }) => {
  const { width, height, video_id, provider_name, html } =
    slice.primary.embedURL

  const { ref, inView } = useInView({
    triggerOnce: true,
  })

  const provider = provider_name.toLowerCase()

  const videoSrc =
    video_id ??
    (provider_name === 'youtube' && html ? getYoutubeID(html) : null)

  if (!videoSrc) {
    return null
  }

  const src =
    provider === 'youtube'
      ? `https://www.youtube.com/embed/${videoSrc}`
      : `https://player.vimeo.com/video/${videoSrc}`

  return (
    <div
      ref={ref}
      className={classNames('Video', {
        [`is-${provider}`]: provider,
        'is-inView': inView,
      })}
      style={{
        '--video-width': `${width}`,
        '--video-height': `${height}`,
      }}
    >
      <div className="Video-inner">
        <iframe
          src={src}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default Video
