import React from 'react'
import classNames from 'classnames'
import Image from '../Image'
import LinkWrap from '../LinkWrap'
import { m, useReducedMotion } from 'framer-motion'
import { slugify, randomNumbers } from '../../lib/utilities'
import { linkResolver } from '../../lib/prismic'

const AnimatedItem = ({ className, isActive, children, background, index }) => {
  const reduceMotion = useReducedMotion()

  return (
    <m.div
      className={className}
      initial="notActive"
      animate={isActive ? 'active' : 'notActive'}
      exit="exit"
      style={{
        backgroundColor: background ? `var(--color-${background})` : null,
      }}
      variants={{
        active: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.2,
            delay: reduceMotion ? 0 : 0.2 + index * 0.02,
          },
        },
        notActive: {
          opacity: 0,
          scale: 0.7,
          transition: {
            duration: 0.2,
            delay: reduceMotion ? 0 : index * 0.02,
          },
        },
        exit: {
          opacity: 0,
          scale: 0.7,
          transition: {
            duration: 0.2,
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
      (!item.data?.category && !activeFilter) ||
      (item?.data?.category && slugify(item.data.category) === activeFilter))

  const imageOriginalWidth = item?.data?.main_image?.dimensions.width
  const imageOriginalHeight = item?.data?.main_image?.dimensions.height

  const rectImageWidth = 116
  const rectImageHeight = 116

  const imagePosition =
    item?.data?.image_position &&
    item.data.image_position.match('([0-9]{1,3}%) ([0-9]{1,3}%)')

  const imagePositionX = React.useMemo(
    () => (imagePosition ? imagePosition[1] : `${randomNumbers(2)}%`),
    [imagePosition]
  )
  const imagePositionY = React.useMemo(
    () => (imagePosition ? imagePosition[2] : `${randomNumbers(2)}%`),
    [imagePosition]
  )

  const rectX =
    imageOriginalWidth &&
    Math.min(
      Math.floor(imageOriginalWidth * (imagePositionX.replace('%', '') / 100)),
      imageOriginalWidth - rectImageWidth
    )

  const rectY =
    imageOriginalHeight &&
    Math.min(
      Math.floor(imageOriginalHeight * (imagePositionY.replace('%', '') / 100)),
      imageOriginalHeight - rectImageHeight
    )

  return (
    <div
      key={item.uid || itemIndex}
      className={classNames('ProjectsGrid-item', {
        'has-noImage': !item?.data?.main_image?.url,
        'is-visible': isVisible,
      })}
      onMouseEnter={() => handleMouseEnter(item)}
    >
      <LinkWrap url={linkResolver(item)}>
        <AnimatedItem
          className="ProjectsGrid-itemInner"
          isActive={isVisible}
          index={itemIndex}
          background={
            item?.data?.background_color
              ? item?.data?.background_color.toLowerCase()
              : null
          }
        >
          {item?.data?.main_image?.url && (
            <Image
              className="ProjectsGrid-image"
              width={rectImageWidth}
              height={rectImageHeight}
              onLoadingComplete={() => handleImageLoad(item.uid)}
              alt=""
              rect={`${rectX},${rectY},${rectImageWidth * 2},${
                rectImageHeight * 2
              }`}
              src={item?.data?.main_image}
              priority
            />
          )}
        </AnimatedItem>
      </LinkWrap>
      {item?.data?.main_image && (
        <Image
          hidden
          alt=""
          width={(1440 / 12) * 6}
          height={(1440 / 12) * 6 * 1.1671511628}
          layout="responsive"
          quality={50}
          sizes="(max-width: 1400px) 50vw, 686px"
          src={item?.data?.main_image}
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
