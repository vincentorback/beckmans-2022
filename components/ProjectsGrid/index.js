import React from 'react'
import Link from 'next-translate-routes/link'
import Image from '../Image'
import classNames from 'classnames'
import styles from './index.module.css'
import { slugify } from '../../lib/utilities'
import { useTranslations } from 'next-intl'

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
      data-id={item.uid}
      key={item.uid}
      style={{
        '--color': item.name ? 'var(--color-red)' : 'var(--color-red)',
      }}
    >
      <div className={styles.windowContent}>
        <p>{item.name ? item.name : item.title}</p>
        {item.category && <p>{t(slugify(item.category))}</p>}
      </div>
      {item?.image && (
        <Image
          className={styles.windowItemImage}
          src={item.image}
          width={1200}
          height={1200}
          alt=""
          layout="fill"
          quality={10}
        />
      )}
      <div
        className={classNames(styles.windowDots, {
          [styles['is-visible']]: item.name,
        })}
      >
        {[...Array(9)].map((_, i) => (
          <div key={`${item.uid}_${i}`}>{!item.name && '←'}</div>
        ))}
      </div>
    </div>
  )
}

const Grid = ({ activeFilter, items, handleMouseEnter }) => {
  return (
    <div className={styles.grid}>
      {items.map((item, itemIndex) => {
        const isVisible =
          !activeFilter ||
          (!item.name && !activeFilter) ||
          (item.name && item.category === activeFilter)

        return (
          <div
            key={item.uid || itemIndex}
            className={classNames(styles.item, {
              [styles['is-visible']]: isVisible,
              // [styles['is-active']]: activeItem === item.uid,
              [styles['is-extra']]: !item.name,
            })}
            style={{
              '--color': item.color,
            }}
            onMouseEnter={() => handleMouseEnter(item)}
          >
            {item.name ? (
              <>
                <Link href={item.url} prefetch={false}>
                  <a
                    className={styles.link}
                    // disabled={
                    //   !activeItems.includes(
                    //     `/${slugify(item.category)}/${item.uid}`
                    //   )
                    // }
                  >
                    <div className={styles.itemInner}>
                      {/* <div className={styles.content}>
                        <p>{item.data.title[0].text}</p>
                        <p>{item.category}</p>
                      </div> */}
                      <Image
                        className={styles.image}
                        src={item.image}
                        width={1200}
                        height={1200}
                        alt=""
                        layout="fill"
                        quality={10}
                      />
                    </div>
                  </a>
                </Link>
                <div className={styles.dots}>
                  {[...Array(9)].map((_, i) => (
                    <div key={`${itemIndex}_${i}`}></div>
                  ))}
                </div>
              </>
            ) : item.url ? (
              <Link href={item?.url}>
                <a className={styles.link}>
                  <div className={styles.itemInner}>
                    <div className={styles.content}>
                      <p>{item.title}</p>
                    </div>
                  </div>
                </a>
              </Link>
            ) : (
              <div className={styles.link}>
                <div className={styles.itemInner}>
                  <div className={styles.content}>
                    <p>{item.title}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const ProjectsGrid = ({ items, activeFilter }) => {
  const [activeItem, setActiveItem] = React.useState(null)

  React.useEffect(() => {
    if (activeFilter && activeItem && activeItem.category !== activeFilter) {
      setActiveItem(null)
    }
  }, [activeItem, activeFilter])

  const handleMouseEnter = (item) => {
    setActiveItem(item)
  }

  const memoGrid = React.useMemo(
    () => (
      <Grid
        items={items}
        activeFilter={activeFilter}
        handleMouseEnter={handleMouseEnter}
      />
    ),
    [items, activeFilter]
  )

  const memoWindow = React.useMemo(
    () => <Window item={activeItem} />,
    [activeItem]
  )

  return (
    <div className={styles.container}>
      {memoGrid}
      {memoWindow}
    </div>
  )
}

export default ProjectsGrid
