import React from 'react'
import classNames from 'classnames'
import Link from 'next-translate-routes/link'
import Image from '../Image'
import Window from './Window'
import Grid from './Grid'
import LinkWrap from '../LinkWrap'
import { slugify, isEmpty } from '../../lib/utilities'
import { IN_SESSION_KEY } from '../../lib/constants'
import { useTranslations } from 'next-intl'
import {
  MotionConfig,
  AnimatePresence,
  m,
  useReducedMotion,
} from 'framer-motion'
import styles from './projectsGrid.module.css'

const ProjectsGrid = ({ activeFilter, isReady, items, setGridLoaded }) => {
  const [activeItem, setActiveItem] = React.useState(null)
  const [previousActiveItem, setPreviousActiveItem] = React.useState(null)
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
    setActiveItem((prev) =>
      !activeFilter || prev?.category === activeFilter ? prev : null
    )
  }, [activeFilter])

  React.useEffect(() => {
    if (dotsDone && isReady) {
      setDotAnimation('active')
    }
  }, [dotsDone, isReady])

  const handleMouseEnter = React.useCallback(
    (item) => {
      isReady &&
        setActiveItem((prev) => {
          setPreviousActiveItem(prev)
          return item
        })
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
    () =>
      isReady && <Window item={activeItem} previousItem={previousActiveItem} />,
    [isReady, activeItem, previousActiveItem]
  )

  const dotVariants = React.useMemo(
    () => ({
      loading: (index) => ({
        opacity: 1,
        scale: 1,
        x: '-50%',
        y: '-50%',
        transition: {
          duration: 0.3,
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
      <div className={styles.dots}>
        {[...Array(375)].map((_, dotIndex) => (
          <m.div
            key={`dot_${dotIndex}`}
            style={{
              '--row': Math.floor(dotIndex / 25),
              '--cell': Math.floor(dotIndex % 25),
            }}
            custom={dotIndex}
            initial={sessionStorage[IN_SESSION_KEY] ? 'active' : 'hidden'}
            variants={dotVariants}
            animate={sessionStorage[IN_SESSION_KEY] ? '' : dotAnimation}
            onAnimationComplete={(definition) => {
              if (
                sessionStorage[IN_SESSION_KEY] ||
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
      className={classNames(styles.container, {
        [styles['is-ready']]: isReady,
      })}
    >
      <div className={styles.inner}>
        {memoGrid}
        {memoWindow}
        {memoDots}
      </div>
    </div>
  )
}

export default ProjectsGrid
