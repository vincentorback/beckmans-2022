import React from 'react'
import classNames from 'classnames'
import Link from 'next-translate-routes/link'
import Image from '../Image'
import Window from './Window'
import LinkWrap from '../LinkWrap'
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

const Item = ({
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
        [styles['is-visible']]: isVisible,
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
}

const Grid = ({
  isReady,
  activeFilter,
  items,
  handleMouseEnter,
  setAllImagesLoades,
}) => {
  const [imagesLoaded, setImagesLoades] = React.useState(0)

  const realProjectsLength = React.useMemo(
    () => items && items.filter((item) => item.category).length,
    [items]
  )
  const handleImageLoad = React.useCallback(() => {
    setImagesLoades((i) => i + 1)
  }, [setImagesLoades])

  React.useEffect(() => {
    if (imagesLoaded >= realProjectsLength) {
      setAllImagesLoades(true)
    }
  }, [imagesLoaded, realProjectsLength, setAllImagesLoades])

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

export default Grid
