import React from 'react'
import classNames from 'classnames'
import Image from '../Image'
import LinkWrap from '../LinkWrap'
import { m, useReducedMotion } from 'framer-motion'

const AnimatedItem = ({ className, isActive, children, background, index }) => {
  const reduceMotion = useReducedMotion()

  return (
    <m.div
      className={className}
      initial="notActive"
      animate={isActive ? 'active' : 'notActive'}
      exit="exit"
      style={{
        backgroundColor: background,
      }}
      variants={{
        active: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.1,
            delay: reduceMotion ? 0 : index * 0.02,
          },
        },
        notActive: {
          opacity: 0,
          scale: 0.8,
          transition: {
            duration: 0.1,
            delay: reduceMotion ? 0 : index * 0.02,
          },
        },
        exit: {
          opacity: 0,
          scale: 0.8,
          transition: {
            duration: 0.1,
            delay: reduceMotion ? 0 : index * 0.03,
          },
        },
      }}
    >
      {children}
    </m.div>
  )
}

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
      className={classNames('ProjectsGrid-item', {
        'has-noImage': !item?.image,
        'is-visible': isVisible,
      })}
      onMouseEnter={() => handleMouseEnter(item)}
    >
      <LinkWrap url={item.url}>
        <AnimatedItem
          className="ProjectsGrid-itemInner"
          isActive={isVisible}
          index={itemIndex}
          background={item.background}
        >
          {item?.image && (
            <Image
              alt={item.name}
              className="ProjectsGrid-image"
              width={imageWidth}
              height={imageHeight}
              layout="fixed"
              onLoadingComplete={() => handleImageLoad(item.uid)}
              priority
              quality={10}
              rect={`${rectX},${rectY},${imageOriginalWidth},${imageOriginalHeight}`}
              src={item.image}
            />
          )}
        </AnimatedItem>
      </LinkWrap>
      {/* {item?.image && (
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
      )} */}
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
      <div className="ProjectsGrid-grid">
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
