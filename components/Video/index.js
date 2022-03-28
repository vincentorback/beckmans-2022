import React from 'react'
import classNames from 'classnames'
import Plyr from 'plyr-react'
import { useInView } from 'react-intersection-observer'

const Video = ({ width, height, video_id, provider_name, html }) => {
  const videoRef = React.useRef()

  const { ref, inView } = useInView({
    triggerOnce: true,
  })

  React.useEffect(() => {
    const plyr = videoRef?.current?.plyr

    const onError = (error) => {
      console.log('Replace with iframe', error)

      if (html) {
        console.log(html)
      }
      // const errorMessage = e?.reason?.message || error?.message
    }

    if (plyr?.on) {
      plyr.on('error', onError)
    }

    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onError)

    return () => {
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onError)
      if (plyr?.off) {
        plyr.off('error', onError)
      }
    }
  }, [inView, html])

  // TODO: On error, replace with {html}

  const MemoVideo = React.useMemo(
    () => (
      <Plyr
        ref={videoRef}
        source={{
          type: 'video',
          sources: [
            {
              src: video_id,
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
    ),
    [video_id, provider_name]
  )

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
