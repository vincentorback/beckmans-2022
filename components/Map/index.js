import React from 'react'
import Link from 'next-translate-routes/link'
import Image from '../Image'
import classNames from 'classnames'

const Map = ({ items, category }) => {
  const [allImagesLoaded, setAllImagesLoaded] = React.useState(false)
  const [imagesLoaded, setImagesLoaded] = React.useState(1)

  const handleImageLoad = React.useCallback(() => {
    setImagesLoaded((prev) => {
      if (
        prev ===
        items.filter((item) => item.category && item.category === category)
          .length
      ) {
        setAllImagesLoaded(true)
      }

      return prev + 1
    })
  }, [setImagesLoaded, items, category])

  const [activeItem, setActiveItem] = React.useState(null)

  const handleMouse = React.useCallback((value) => {
    setActiveItem(value)
  }, [])

  const MemoMap = React.useMemo(() => {
    return (
      <div
        className={classNames('Map', {
          'is-active': allImagesLoaded,
        })}
      >
        <p className="Map-activeTitle">{activeItem}</p>
        <div className="Map-container">
          <div className="Map-grid">
            {items.map((item, itemIndex) => {
              const isVisible = item.category && item.category === category

              const imageOriginalWidth = 1038
              const imageOriginalHeight = 1200
              const imageWidth = 40
              const imageHeight = 40

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
                  className={classNames('Map-item', {
                    'is-visible': isVisible,
                  })}
                  onMouseEnter={() => isVisible && handleMouse(item.name)}
                  onMouseLeave={() => isVisible && handleMouse(null)}
                >
                  {isVisible && (
                    <Link href={item.url} prefetch={false} scroll={false}>
                      <a className="Map-itemLink">
                        <div className="Map-itemInner">
                          <Image
                            className="Map-itemImage"
                            src={item.image}
                            width={imageWidth}
                            height={imageHeight}
                            layout="fixed"
                            rect={`${rectX},${rectY},${imageOriginalWidth},${imageOriginalHeight}`}
                            quality={10}
                            alt={item.name}
                            onLoadingComplete={() => handleImageLoad(item.uid)}
                          />
                        </div>
                      </a>
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
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
        </div>
      </div>
    )
  }, [
    activeItem,
    handleImageLoad,
    handleMouse,
    items,
    category,
    allImagesLoaded,
  ])

  return MemoMap
}

export default Map
