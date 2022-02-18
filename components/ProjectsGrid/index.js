import React from 'react'
import classNames from 'classnames'
import Link from 'next-translate-routes/link'
import Image from '../Image'
import { slugify, isEmpty } from '../../lib/utilities'
import { useTranslations } from 'next-intl'
import { MotionConfig, AnimatePresence, m } from 'framer-motion'
import styles from './projectsGrid.module.css'

const AnimatedItem = ({ className, isActive, children, index }) => (
  <m.div
    className={className}
    initial="notActive"
    animate={isActive ? 'active' : 'notActive'}
    variants={{
      // fadeIn: {
      //   opacity: 1,
      //   scale: 1,
      //   transition: { duration: 0.3, delay: index * 0.01 },
      // },
      active: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.1, delay: index * 0.015 },
      },
      notActive: {
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.1, delay: index * 0.015 },
      },
    }}
  >
    {children}
  </m.div>
)

const LinkWrap = ({ url, children }) => {
  if (url) {
    return (
      <Link href={url} prefetch={false}>
        <a>{children}</a>
      </Link>
    )
  }

  return children
}

const Window = ({ item, previousItem }) => {
  const [isLoaded, setIsLoaded] = React.useState(isEmpty(item?.image))

  const t = useTranslations('categories')

  if (!item?.uid) {
    return null
  }

  return (
    <div className={styles.window}>
      {previousItem?.uid && previousItem.uid !== item.uid && (
        <div key={previousItem.uid} className={styles.windowItem} id="prev">
          <div
            className={styles.windowItemInner}
            style={{
              backgroundColor: previousItem.color ?? null,
            }}
          >
            <div className={styles.windowContent}>
              <p>
                {previousItem.name ? previousItem.name : previousItem.title}
              </p>
              {previousItem.category && <p>{t(previousItem.category)}</p>}
              {previousItem.subtitle && <p>{previousItem.subtitle}</p>}
            </div>
            {previousItem?.image && (
              <Image
                alt=""
                className={styles.windowItemImage}
                width={1038}
                height={1200}
                layout="fill"
                quality={10}
                sizes="(max-width: 1400px) 50vw, 686px"
                src={previousItem.image}
              />
            )}
          </div>
        </div>
      )}
      <div className={styles.windowItem} key={item.uid}>
        <LinkWrap url={item.url}>
          <m.div
            className={styles.windowItemInner}
            layout
            initial="loading"
            animate={isLoaded ? 'complete' : 'loading'}
            style={{
              backgroundColor: item.color ?? null,
            }}
            variants={{
              loading: { opacity: 0, scale: 0.98 },
              complete: {
                transition: { duration: 0.1, delay: 0.05 },
                opacity: 1,
                scale: 1,
              },
            }}
          >
            <div className={styles.windowContent}>
              <p>{item.name ? item.name : item.title}</p>
              {item.category && <p>{t(item.category)}</p>}
              {item.subtitle && <p>{item.subtitle}</p>}
            </div>
            {item?.image && (
              <Image
                alt=""
                className={styles.windowItemImage}
                width={1038}
                height={1200}
                layout="fill"
                quality={10}
                sizes="(max-width: 1400px) 50vw, 686px"
                src={item.image}
                onLoadingComplete={() => {
                  setIsLoaded(true)
                }}
              />
            )}
          </m.div>
        </LinkWrap>
      </div>
      <div className={styles.windowDots}>
        {[...Array(9)].map((_, dotIndex) => (
          <div key={`dot_${dotIndex}`} />
        ))}
      </div>
    </div>
  )
}

const Grid = ({ isReady, activeFilter, items, handleMouseEnter, onLoad }) => {
  const [imagesLoaded, setImagesLoades] = React.useState(0)

  const realProjectsLength = React.useMemo(
    () => items.filter((item) => item.category).length,
    [items]
  )
  const handleImageLoad = React.useCallback(() => {
    setImagesLoades((i) => i + 1)
  }, [])

  React.useEffect(() => {
    if (imagesLoaded >= realProjectsLength) {
      onLoad()
    }
  }, [imagesLoaded, realProjectsLength, onLoad])

  const Item = React.useCallback(
    ({
      item,
      itemIndex,
      isReady,
      activeFilter,
      handleMouseEnter,
      handleImageLoad,
    }) => {
      const isVisible =
        isReady &&
        (!activeFilter ||
          (!item.name && !activeFilter) ||
          (item.category && item.category === activeFilter))

      const imageOriginalWidth = 1038
      const imageOriginalHeight = 1200
      const imageWidth = 115
      const imageHeight = 115

      const imagePosition =
        item.imagePosition &&
        item.imagePosition.match('([0-9]{1,3}%) ([0-9]{1,3}%)')

      const imagePositionX = imagePosition ? imagePosition[1] : '50%'
      const imagePositionY = imagePosition ? imagePosition[2] : '50%'
      const rectX = Math.floor(
        imageOriginalWidth * (imagePositionX.replace('%', '') / 100)
      )
      const rectY = Math.floor(
        imageOriginalHeight * (imagePositionY.replace('%', '') / 100)
      )

      return (
        <div
          key={item.uid || itemIndex}
          className={classNames(styles.item, {
            [styles['has-noImage']]: !item?.image,
          })}
          onMouseEnter={() => handleMouseEnter(item)}
        >
          <LinkWrap url={item.url}>
            <AnimatedItem
              className={styles.itemInner}
              isActive={isVisible}
              index={itemIndex}
            >
              {item?.image && (
                <Image
                  alt={item.name}
                  className={styles.image}
                  width={imageWidth}
                  height={imageHeight}
                  layout="fixed"
                  onLoadingComplete={() => {
                    handleImageLoad(item.uid)
                  }}
                  priority
                  quality={10}
                  rect={`${rectX},${rectY},${imageOriginalWidth},${imageOriginalHeight}`}
                  src={item.image}
                />
              )}
            </AnimatedItem>
          </LinkWrap>
          {item?.image && (
            <Image
              alt=""
              width={686}
              height={800}
              hidden
              layout="fill"
              priority
              quality={10}
              sizes="(max-width: 1400px) 50vw, 686px"
              src={item.image}
            />
          )}
        </div>
      )
    },
    []
  )

  return React.useMemo(
    () => (
      <div className={styles.grid}>
        {items.map((item, itemIndex) => (
          <Item
            item={item}
            isReady={isReady}
            itemIndex={itemIndex}
            key={item.uid}
            activeFilter={activeFilter}
            handleMouseEnter={handleMouseEnter}
            handleImageLoad={handleImageLoad}
          />
        ))}
      </div>
    ),
    [items, isReady, activeFilter, handleMouseEnter, handleImageLoad]
  )
}

const ProjectsGrid = ({ activeFilter, isReady, items, setReady }) => {
  const [activeItem, setActiveItem] = React.useState(null)
  const [previousActiveItem, setPreviousActiveItem] = React.useState(null)

  React.useEffect(() => {
    setActiveItem((prev) =>
      !activeFilter || prev?.category === activeFilter ? prev : null
    )
  }, [activeFilter])

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
        items={items}
        onLoad={() => {
          setReady(true)
        }}
      />
    ),
    [items, activeFilter, setReady, handleMouseEnter, isReady]
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
          delay: (index % (25 * 1.3)) * 0.05,
        },
        backgroundColor: 'var(--color-black)',
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
    []
  )

  const [dotAnimation, setDotAnimation] = React.useState('loading')
  const [dotsDone, setDotsDone] = React.useState(false)

  React.useEffect(() => {
    if (dotsDone && isReady) {
      setDotAnimation('active')
    }
  }, [dotsDone, isReady])

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
            initial="hidden"
            variants={dotVariants}
            animate={dotAnimation}
            onAnimationComplete={(definition) => {
              if (definition === 'loading' && dotIndex === 357) {
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
