import React from 'react'
import Image from '../Image'
import classNames from 'classnames'
import Plyr from 'plyr-react'
import { useInView } from 'react-intersection-observer'

import 'plyr-react/dist/plyr.css'
import styles from './video.module.css'

const Video = ({ id, provider, width, height, html }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  })

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
