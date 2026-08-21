import React from 'react'
import Plyr from 'plyr-react'
import { getYoutubeID } from '../../lib/utilities'

const Player = ({ videoId, providerName, html, onError }) => {
  const plyrRef = React.useRef()

  React.useEffect(() => {
    try {
      if (plyrRef?.current?.plyr) {
        const plyr = plyrRef?.current?.plyr

        if (plyr && plyr.source) {
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
      onError()
    }
  }, [plyrRef?.current?.plyr, onError])

  return (
    <Plyr
      ref={plyrRef}
      id={videoId}
      source={{
        type: 'video',
        sources: [
          {
            src:
              videoId ??
              (providerName === 'YouTube' && html ? getYoutubeID(html) : false),
            provider: providerName.toLowerCase(),
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
}

export default Player
