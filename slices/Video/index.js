import React from 'react'
import classNames from 'classnames'
import Plyr from 'plyr-react'
import { useInView } from 'react-intersection-observer'
import { getYoutubeID } from '../../lib/utilities'

const Video = ({ slice }) => {
  const { width, height, video_id, provider_name, html } =
    slice.primary.embedURL
  const plyrRef = React.useRef()

  const { ref, inView } = useInView({
    triggerOnce: true,
  })

  React.useEffect(() => {
    const plyr = plyrRef?.current?.plyr

    if (plyr && plyr?.source) {
      const onError = (error) => {
        console.log('Replace with iframe', error)

        if (html) {
          console.log(html)
        }
        // const errorMessage = e?.reason?.message || error?.message
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
  }, [plyrRef?.current?.plyr, inView, html])

  // TODO: On error, replace with {html}

  const MemoVideo = React.useMemo(() => {
    if (!provider_name || !video_id) return null

    return (
      <Plyr
        ref={plyrRef}
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
        }}
      />
    )
  }, [video_id, provider_name, html])

  return (
    <div
      ref={ref}
      className={classNames('Video', {
        [`is-${provider_name.toLowerCase()}`]: provider_name,
        'is-inView': inView,
      })}
      style={{
        '--video-width': `${width}`,
        '--video-height': `${height}`,
      }}
    >
      <div className="Video-inner">{MemoVideo}</div>
    </div>
  )
}

export default Video
