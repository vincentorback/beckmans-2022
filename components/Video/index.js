import React from 'react'
import Image from '../Image'
import classNames from 'classnames'
import Plyr from 'plyr-react'
import { useInView } from 'react-intersection-observer'

import 'plyr-react/dist/plyr.css'
import styles from './video.module.css'

const Video = ({ id, provider, width, height, html }) => {
  const videoRef = React.useRef()

  const { ref, inView } = useInView({
    triggerOnce: true,
  })

  React.useEffect(() => {
    const plyr = videoRef?.current?.plyr

    const onError = (error) => {
      console.log(error)
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
  }, [inView])

  // TODO: On error, replace with {html}

  return (
    <div ref={ref} className={classNames(styles.video, styles.provider)}>
      <div
        className={classNames(styles.inner, {
          [styles.inView]: inView,
        })}
        style={{
          '--width': `${width}`,
          '--height': `${height}`,
        }}
      >
        <Plyr
          ref={videoRef}
          source={{
            type: 'video',
            sources: [
              {
                src: id,
                provider: provider.toLowerCase(),
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
      </div>
    </div>
  )
}

export default Video
