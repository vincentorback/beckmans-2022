import React from 'react'
import classNames from 'classnames'
import Window from './Window'
import Grid from './Grid'
import { SESSION_STARTED } from '../../lib/constants'
import { m, useReducedMotion } from 'framer-motion'

const ProjectsGrid = ({
  activeItem,
  previousActiveItem,
  setActiveItem,
  activeFilter,
  isReady,
  items,
  setGridLoaded,
}) => {
  const [dotAnimation, setDotAnimation] = React.useState('loading')
  const [dotsDone, setDotsDone] = React.useState(false)
  const [allImagesLoaded, setAllImagesLoades] = React.useState(false)

  const reduceMotion = useReducedMotion()

  React.useEffect(() => {
    if (allImagesLoaded && dotsDone) {
      setGridLoaded(true)
    }
  }, [setGridLoaded, allImagesLoaded, dotsDone])

  React.useEffect(() => {
    if (dotsDone && isReady) {
      setDotAnimation('active')
    }
  }, [dotsDone, isReady])

  const handleMouseEnter = React.useCallback(
    (item) => {
      isReady && setActiveItem(item)
    },
    [isReady, setActiveItem]
  )

  const memoGrid = React.useMemo(
    () => (
      <Grid
        activeFilter={activeFilter}
        handleMouseEnter={handleMouseEnter}
        isReady={isReady}
        setAllImagesLoades={setAllImagesLoades}
        items={items}
      />
    ),
    [items, activeFilter, handleMouseEnter, isReady]
  )

  const memoWindow = React.useMemo(
    () => <Window item={activeItem} previousItem={previousActiveItem} />,
    [activeItem, previousActiveItem]
  )

  const dotVariants = React.useMemo(
    () => ({
      loading: (index) => ({
        opacity: 1,
        scale: 1,
        x: '-50%',
        y: '-50%',
        transition: {
          duration: 0.4,
          delay: reduceMotion ? 0 : (index % (25 * 1.3)) * 0.075,
        },
        backgroundColor: reduceMotion ? null : 'var(--color-black)',
      }),
      active: (index) => ({
        opacity: Math.floor(index % 25) < 13 ? 1 : 0,
        scale: Math.floor(index % 25) < 13 ? 1 : 0,
        x: '-50%',
        y: '-50%',
        transition: {
          duration: 0.2,
        },
        backgroundColor: 'var(--color-white)',
      }),
      hidden: {
        opacity: 0,
        scale: 0,
        x: '-50%',
        y: '-50%',
        transition: {
          duration: 0.2,
        },
      },
    }),
    [reduceMotion]
  )

  const memoDots = React.useMemo(
    () => (
      <div className="ProjectsGrid-dots">
        {[...Array(375)].map((_, dotIndex) => (
          <m.div
            key={`dot_${dotIndex}`}
            style={{
              '--row': Math.floor(dotIndex / 25),
              '--cell': Math.floor(dotIndex % 25),
            }}
            custom={dotIndex}
            initial={sessionStorage[SESSION_STARTED] ? 'active' : 'hidden'}
            animate={sessionStorage[SESSION_STARTED] ? '' : dotAnimation}
            variants={dotVariants}
            onAnimationComplete={(definition) => {
              if (
                sessionStorage[SESSION_STARTED] ||
                (definition === 'loading' && dotIndex === 357)
              ) {
                setDotsDone(true)
              }
            }}
          />
        ))}
      </div>
    ),
    [dotVariants, dotAnimation]
  )

  return (
    <div
      className={classNames('ProjectsGrid', {
        'is-ready': isReady,
      })}
    >
      <div className="ProjectsGrid-inner">
        {memoGrid}
        {Boolean(isReady && activeItem) && memoWindow}
        {memoDots}
      </div>
    </div>
  )
}

export default ProjectsGrid
