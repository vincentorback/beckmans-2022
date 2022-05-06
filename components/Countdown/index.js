import React from 'react'
import { LAUNCH_DATE } from '../../lib/constants'
import { dates } from '../../lib/utilities'
import { formatTimeDelta, calcTimeDelta } from 'react-countdown'

const Countdown = () => {
  const [isDone, setisDone] = React.useState(
    dates.compare(Date.now(), LAUNCH_DATE) === 1
  )

  const handleComplete = React.useCallback(() => {
    setisDone(true)
  }, [])

  const launchDate = React.useMemo(() => {
    const date = dates.convert(LAUNCH_DATE)
    return date.getTime()
  }, [])

  const [timeDelta, setTimeDelta] = React.useState(
    formatTimeDelta(calcTimeDelta(launchDate))
  )

  React.useEffect(() => {
    const timer = setInterval(() => {
      const time = calcTimeDelta(launchDate)

      if (time.total <= 0) {
        clearInterval(timer)
        handleComplete()
      } else {
        setTimeDelta(formatTimeDelta(time))
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [launchDate, handleComplete])

  if (isDone) return null

  return (
    <div className="Countdown">
      <p className="Countdown-text">
        {Object.keys(timeDelta)
          .filter((key) => key !== 'days' || timeDelta[key] !== '00')
          .map((key) =>
            timeDelta[key]
              .split('')
              .map((int, intIndex) => <span key={intIndex}>{int}</span>)
          )}
      </p>
      <button onClick={handleComplete}>skip</button>
    </div>
  )
}

export default Countdown
