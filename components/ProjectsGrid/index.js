import React from 'react'
import classNames from 'classnames'
import Link from 'next-translate-routes/link'
import Image from '../Image'
import { slugify } from '../../lib/utilities'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import styles from './projectsGrid.module.css'

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

const Window = ({ item }) => {
  if (!item) {
    item = {
      uid: 123,
    }
  }

  const t = useTranslations('categories')

  return (
    <div
      className={styles.windowItem}
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
            alt=""
            className={styles.windowItemImage}
            height={800}
            layout="fill"
            quality={10}
            sizes="(max-width: 1400px) 50vw, 686px"
            src={item.image}
            width={686}
          />
        )}
      </LinkWrap>
    </div>
  )
}

const Grid = ({ isReady, activeFilter, items, handleMouseEnter, onLoad }) => {
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
            [styles['is-loaded']]: isReady,
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
                  alt={item.name}
                  className={styles.image}
                  height={imageHeight}
                  layout="fixed"
                  onLoadingComplete={() => {
                    handleImageLoad(item.uid)
                  }}
                  priority
                  quality={10}
                  rect={`${rectX},${rectY},${imageOriginalWidth},${imageOriginalHeight}`}
                  src={item.image}
                  width={imageWidth}
                />
              )}
            </AnimatedItem>
          </LinkWrap>
          {item?.image && (
            <Image
              alt=""
              height={800}
              hidden
              layout="fill"
              priority
              quality={10}
              sizes="(max-width: 1400px) 50vw, 686px"
              src={item.image}
              width={686}
            />
          )}
        </div>
      )
    },
    []
  )

  const DaGrid = React.useMemo(
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

  return DaGrid
}

const ProjectsGrid = ({ activeFilter, isReady, items, setReady }) => {
  const [activeItem, setActiveItem] = React.useState(null)

  React.useEffect(() => {
    setActiveItem((prev) =>
      !activeFilter || prev?.category === activeFilter ? prev : null
    )
  }, [activeFilter])

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
        items={items}
        onLoad={() => {
          setReady(true)
        }}
      />
    ),
    [items, activeFilter, setReady, handleMouseEnter, isReady]
  )

  const memoWindow = React.useMemo(
    () => isReady && <Window item={activeItem} />,
    [isReady, activeItem]
  )

  const memoDots = React.useMemo(
    () => (
      <div
        className={classNames(styles.dots, {
          [styles['is-loaded']]: isReady,
        })}
      >
        {[...Array(375)].map((_, i) => (
          <div
            style={{
              '--row': Math.floor(i / 25),
              '--cell': Math.floor(i % 25),
              opacity: !isReady || (isReady && Math.floor(i % 25) < 13) ? 1 : 0,
            }}
            key={`dot_${i}`}
          />
        ))}
      </div>
    ),
    [isReady]
  )

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {memoGrid}
        {memoWindow}
        {memoDots}
      </div>
    </div>
  )
}

export default ProjectsGrid
