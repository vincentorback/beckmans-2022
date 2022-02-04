import React from 'react'
import Image from '../Image'
import classNames from 'classnames'
import styles from './index.module.css'
import Plyr from 'plyr-react'
import { useInView } from 'react-intersection-observer'
import 'plyr-react/dist/plyr.css'

const Video = ({ provider, id, poster }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  })

  return (
    <div ref={ref} className={classNames(styles.video, styles.provider)}>
      <div
        className={classNames(styles.inner, {
          [styles.inView]: inView,
        })}
        style={{
          paddingBottom: `${(360 / 640) * 100}%`,
        }}
      >
        <Plyr
          source={{
            type: 'video',
            sources: [
              {
                src: id,
                provider,
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
            vimeo: {
              byline: false,
              portrait: false,
              title: false,
              speed: false,
              transparent: true,
            },
            youtube: {
              noCookie: false,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              modestbranding: 1,
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
