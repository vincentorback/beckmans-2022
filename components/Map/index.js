import React from 'react'
import Link from 'next-translate-routes/link'
import Image from '../Image'
import { isEmpty } from '../../lib/utilities'
import { linkResolver } from '../../lib/prismic'
import { m } from 'framer-motion'
import * as prismicH from '@prismicio/helpers'

const Map = ({ items, category }) => {
  const [allImagesLoaded, setAllImagesLoaded] = React.useState(false)
  const imagesLoaded = React.useRef(0)

  const handleImageLoad = React.useCallback(() => {
    if (!isEmpty(imagesLoaded.current)) {
      imagesLoaded.current += 1

      if (
        imagesLoaded.current ===
        items.filter(
          (item) => item?.data?.category && item.data.category === category
        ).length
      ) {
        setAllImagesLoaded(true)
      }
    }
  }, [items, category])

  const [activeItem, setActiveItem] = React.useState(null)

  const handleMouse = React.useCallback((value) => {
    setActiveItem(value)
  }, [])

  const MemoDots = React.useMemo(() => <MapDots />, [])

  const MemoTitle = React.useMemo(
    () => <p className="Map-activeTitle">{activeItem}</p>,
    [activeItem]
  )

  const MemoGrid = React.useMemo(
    () => (
      <MapGrid
        handleMouse={handleMouse}
        items={items}
        category={category}
        allImagesLoaded={allImagesLoaded}
        handleImageLoad={handleImageLoad}
      />
    ),
    [handleMouse, items, category, allImagesLoaded, handleImageLoad]
  )

  return (
    <div className="Map">
      {MemoTitle}
      <div className="Map-container">
        {MemoGrid}
        {MemoDots}
      </div>
    </div>
  )
}

const MapDots = () => (
  <div className="Map-dots">
    {[...Array(195)].map((_, dotIndex) => (
      <div
        key={`dot_${dotIndex}`}
        style={{
          '--row': Math.floor(dotIndex / 13),
          '--cell': Math.floor(dotIndex % 13),
        }}
      />
    ))}
  </div>
)

const MapGrid = ({
  handleMouse,
  items,
  category,
  allImagesLoaded,
  handleImageLoad,
}) => (
  <div className="Map-grid">
    {items.map((item, itemIndex) => {
      const isVisible = item?.data?.category && item.data.category === category

      const imageOriginalWidth = item?.data?.main_image?.dimensions.width
      const imageOriginalHeight = item?.data?.main_image?.dimensions.height

      const rectImageWidth = 116
      const rectImageHeight = 116

      const imagePosition =
        item?.data?.image_position &&
        item.data.image_position.match('([0-9]{1,3}%) ([0-9]{1,3}%)')

      const imagePositionX = imagePosition ? imagePosition[1] : '50%'
      const imagePositionY = imagePosition ? imagePosition[2] : '50%'

      const rectX =
        imageOriginalWidth &&
        Math.min(
          Math.floor(
            imageOriginalWidth * (imagePositionX.replace('%', '') / 100)
          ),
          imageOriginalWidth - rectImageWidth
        )

      const rectY =
        imageOriginalHeight &&
        Math.min(
          Math.floor(
            imageOriginalHeight * (imagePositionY.replace('%', '') / 100)
          ),
          imageOriginalHeight - rectImageHeight
        )

      return (
        <m.div
          key={item.uid || itemIndex}
          className="Map-item"
          onMouseEnter={() =>
            isVisible && !handleMouse(prismicH.asText(item.data.name))
          }
          onTouchStart={(e) => {
            if (isVisible) {
              e.preventDefault()
              handleMouse(prismicH.asText(item.data.name))
            }
          }}
          onMouseLeave={() => isVisible && handleMouse(null)}
          initial="initial"
          animate={allImagesLoaded && isVisible ? 'active' : 'notActive'}
          exit="exit"
          variants={{
            initial: {
              opacity: 0,
              scale: 0.75,
            },
            active: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3,
                delay: 1 + itemIndex * 0.03,
              },
            },
            notActive: {
              opacity: 0,
              scale: 0.75,
              transition: {
                duration: 0.3,
                delay: itemIndex * 0.03,
              },
            },
            exit: {
              opacity: 0,
              scale: 0.75,
              transition: {
                duration: 0.2,
                delay: (isVisible ? itemIndex : 0) * 0.03,
              },
            },
          }}
        >
          {isVisible && (
            <Link href={linkResolver(item)} prefetch={false} scroll={false}>
              <a className="Map-itemLink">
                <div className="Map-itemInner">
                  <Image
                    className="Map-itemImage"
                    src={item.data.main_image}
                    width={rectImageWidth}
                    height={rectImageHeight}
                    rect={`${rectX},${rectY},${rectImageWidth * 2},${
                      rectImageHeight * 2
                    }`}
                    quality={10}
                    onLoadingComplete={() => handleImageLoad(item.uid)}
                    alt=""
                  />
                </div>
              </a>
            </Link>
          )}
        </m.div>
      )
    })}
  </div>
)

export default Map
