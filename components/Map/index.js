import React from 'react'
import Link from 'next-translate-routes/link'
import Image from '../Image'
import classNames from 'classnames'
import { isEmpty } from '../../lib/utilities'
import styles from './map.module.css'

const Map = ({ items, category }) => {
  const [activeItem, setActiveItem] = React.useState(null)

  const handleMouse = React.useCallback((name) => {
    setActiveItem(name)
  }, [])

  if (isEmpty(items)) return null

  return (
    <div className={styles.map}>
      <p className={styles.activeItem}>{activeItem}</p>
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
                        width={40}
                        height={40}
                        alt=""
                        layout="fixed"
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
    </div>
  )
}

export default Map
