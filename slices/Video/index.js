import React from 'react'
import classNames from 'classnames'
import Plyr from 'plyr-react'
import { useInView } from 'react-intersection-observer'
import { getYoutubeID } from '../../lib/utilities'

const Video = ({ slice }) => {
  const { width, height, video_id, provider_name, html } =
    slice.primary.embedURL

  const plyrRef = React.useRef()
  const containerRef = React.useRef(null)
  const { ref, inView } = useInView({
    triggerOnce: true,
  })
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    try {
      if (plyrRef?.current?.plyr) {
        const plyr = plyrRef?.current?.plyr

        if (plyr && plyr.source) {
          const onError = () => {
            if (html) {
              containerRef.current.innerHTML = `<div class="Video-inner">${html}</div>`
              setHasError(true)
            }
          }

          plyr.on('error', onError)

          window.addEventListener('error', onError)
          window.addEventListener('unhandledrejection', onError)

          return () => {
            window.removeEventListener('error', onError)
            window.removeEventListener('unhandledrejection', onError)

            plyr.off('error', onError)
          }
        }
      }
    } catch (err) {
      console.error(err)
      containerRef.current.innerHTML = `<div class="Video-inner">${html}</div>`
      setHasError(true)
    }
  }, [plyrRef?.current?.plyr, html, containerRef])

  const MemoVideo = React.useMemo(() => {
    if (!provider_name || !video_id) return null

    return (
      <Plyr
        ref={plyrRef}
        id={video_id}
        source={{
          type: 'video',
          sources: [
            {
              src:
                video_id ??
                (provider_name === 'YouTube' && html
                  ? getYoutubeID(html)
                  : false),
              provider: provider_name.toLowerCase(),
            },
          ],
        }}
        options={{
          fullscreen: {
            enabled: true,
            fallback: true,
            iosNative: 'force',
            container: null,
          },
          controls: [
            'play-large',
            'play',
            'progress',
            'duration',
            'mute',
            'volume',
            'fullscreen',
          ],
          youtube: { noCookie: true },
        }}
      />
    )
  }, [video_id, provider_name, html])

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
