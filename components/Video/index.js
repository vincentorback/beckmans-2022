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
    <div ref={ref} className={classNames(styles.video)}>
      <div
        className={classNames(styles.inner, {
          [styles.inView]: inView,
        })}
        style={{
          paddingBottom: `${(360 / 640) * 100}%`,
        }}
      >
        {poster && (
          <Image
            className={styles.poster}
            src={poster}
            layout="fill"
            alt={id}
          />
        )}
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
            controls: [
              'play-large',
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
