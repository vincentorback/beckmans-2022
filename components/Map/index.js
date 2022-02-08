import React from 'react'
import Link from 'next-translate-routes/link'
import Image from '../Image'
import classNames from 'classnames'
import styles from './map.module.css'

const Map = ({ items, category }) => {
  const [activeItem, setActiveItem] = React.useState()

  const handleMouse = React.useCallback((name) => {
    setActiveItem(name)
  }, [])

  if (!items) return null

  return (
    <div className={styles.map}>
      <div className={styles.grid}>
        {items.map((item, itemIndex) => {
          const isVisible = item.category && item.category === category

          return (
            <div
              key={item.uid || itemIndex}
              className={classNames(styles.item, {
                [styles['is-visible']]: isVisible,
              })}
              onMouseEnter={() => isVisible && handleMouse(item.name)}
              onMouseLeave={() => isVisible && handleMouse('')}
            >
              {isVisible && (
                <Link href={item.url}>
                  <a className={styles.link}>
                    <div className={styles.itemInner}>
                      <Image
                        className={styles.image}
                        src={item.image}
                        width={60}
                        height={60}
                        alt=""
                        layout="fill"
                        quality={10}
                      />
                    </div>
                  </a>
                </Link>
              )}
            </div>
          )
        })}
      </div>
      <p className={styles.activeItem}>{activeItem}</p>
    </div>
  )
}

export default Map
