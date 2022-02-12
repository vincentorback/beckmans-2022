import React from 'react'
import Link from 'next-translate-routes/link'
import Image from '../Image'
import classNames from 'classnames'
import styles from './projectsGrid.module.css'
import { slugify } from '../../lib/utilities'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const AnimatedItem = ({ className, isActive, children, index }) => (
  <motion.div
    className={className}
    initial={{
      opacity: 0,
      scale: 0.8,
    }}
    animate={isActive ? 'active' : 'notActive'}
    variants={{
      active: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.1, delay: index * 0.01 },
      },
      notActive: {
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.1, delay: index * 0.01 },
      },
    }}
    // variants={variants} // Pass the variant object into Framer Motion
    // initial="hidden" // Set the initial state to variants.hidden
    // animate="enter" // Animated state to variants.enter
    // exit="exit" // Exit state (used later) to variants.exit
    // transition={{ type: 'ease' }} // Set the transition to linear
  >
    {children}
  </motion.div>
)

const LinkWrap = ({ url, children }) => {
  if (url) {
    return (
      <Link href={url}>
        <a>{children}</a>
      </Link>
    )
  }

  return children
}

const Window = ({ isLoaded, item }) => {
  if (!item) {
    item = {
      uid: 123,
    }
  }

  const t = useTranslations('categories')

  return (
    <div
      className={classNames(styles.windowItem, {
        [styles['is-active']]: item.uid !== 123,
        [styles['is-loaded']]: isLoaded,
      })}
      style={{
        backgroundColor: item.color ?? null,
      }}
      key={item.uid}
    >
      <LinkWrap url={item.url}>
        <div className={styles.windowContent}>
          <p>{item.name ? item.name : item.title}</p>
          {item.category && <p>{t(item.category)}</p>}
          {item.subtitle && <p>{item.subtitle}</p>}
        </div>
        {item?.image && (
          <Image
            className={styles.windowItemImage}
            src={item.image}
            width={686}
            height={800}
            sizes="50vw"
            alt=""
            layout="fill"
            quality={10}
            priority
          />
        )}
      </LinkWrap>
    </div>
  )
}

const Grid = ({ isLoaded, activeFilter, items, handleMouseEnter, onLoad }) => {
  const [loadedImages, setLoadedImages] = React.useState(0)
  const realProjectsLength = React.useMemo(
    () => items.filter((item) => item.category).length,
    [items]
  )
  const handleImageLoad = React.useCallback(() => {
    setLoadedImages((i) => i + 1)
  }, [])

  React.useEffect(() => {
    if (loadedImages >= realProjectsLength) {
      onLoad()
    }
  }, [loadedImages, realProjectsLength, onLoad])

  return (
    <div className={styles.grid}>
      {items.map((item, itemIndex) => {
        const isVisible =
          isLoaded &&
          (!activeFilter ||
            (!item.name && !activeFilter) ||
            (item.category && item.category === activeFilter))

        const imageOriginalWidth = 686
        const imageOriginalHeight = 800
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
              [styles['is-visible']]: isVisible,
              [styles['is-loaded']]: isLoaded,
              [styles['is-extra']]: !item.name,
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
                    className={styles.image}
                    src={item.image}
                    width={imageWidth}
                    height={imageHeight}
                    alt=""
                    layout="fixed"
                    quality={10}
                    priority
                    rect={`${rectX},${rectY},${imageOriginalWidth},${imageOriginalHeight}`}
                    onLoadingComplete={() => {
                      handleImageLoad(item.uid)
                    }}
                  />
                )}
              </AnimatedItem>
            </LinkWrap>
            {item?.image && (
              <Image
                hidden
                src={item.image}
                width={686}
                height={800}
                sizes="50vw"
                alt=""
                layout="fill"
                quality={10}
                priority
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

const ProjectsGrid = ({
  setReady,
  items,
  activeFilter,
  setActiveItem,
  activeItem,
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false)

  const handleMouseEnter = React.useCallback(
    (item) => {
      if (isLoaded) {
        setActiveItem(item)
      }
    },
    [isLoaded, setActiveItem]
  )

  const memoGrid = React.useMemo(
    () => (
      <Grid
        onLoad={() => {
          setIsLoaded(true)
          setReady(true)
        }}
        isLoaded={isLoaded}
        items={items}
        activeFilter={activeFilter}
        handleMouseEnter={handleMouseEnter}
      />
    ),
    [items, activeFilter, setReady, handleMouseEnter, isLoaded]
  )

  const memoWindow = React.useMemo(
    () => <Window isLoaded={isLoaded} item={activeItem} />,
    [isLoaded, activeItem]
  )

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {memoGrid}
        {memoWindow}
        <div
          className={classNames(styles.dots, {
            [styles['is-loaded']]: isLoaded,
          })}
        >
          {[...Array(375)].map((_, i) => (
            <div
              style={{
                '--row': Math.floor(i / 25),
                '--cell': Math.floor(i % 25),
                opacity:
                  !isLoaded || (isLoaded && Math.floor(i % 25) < 13) ? 1 : 0,
              }}
              key={`dot_${i}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectsGrid
