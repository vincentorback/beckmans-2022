import React from 'react'
import Link from 'next-translate-routes/link'
import Image from '../Image'
import classNames from 'classnames'
import styles from './projectsGrid.module.css'
import { slugify } from '../../lib/utilities'
import { useTranslations } from 'next-intl'
// import { useRouter } from 'next/router'

const Window = ({ isLoaded, item }) => {
  if (!item) {
    item = {
      uid: 123,
    }
  }

  const t = useTranslations('categories')

  const LinkWrap = React.useCallback(
    ({ children }) => {
      if (item.url) {
        return (
          <Link href={item.url} prefetch={false}>
            <a className={styles.windowLink}>{children}</a>
          </Link>
        )
      }

      return children
    },
    [item]
  )

  return (
    <div
      className={classNames(styles.windowItem, {
        [styles['is-active']]: item.uid !== 123,
        [styles['is-loaded']]: isLoaded,
      })}
      style={{
        backgroundColor: item.color ?? null,
      }}
      data-id={item.uid}
      key={item.uid}
    >
      <LinkWrap>
        <div className={styles.windowContent}>
          <p>{item.name ? item.name : item.title}</p>
          {item.category && <p>{t(slugify(item.category))}</p>}
          {item.subtitle && <p>{item.subtitle}</p>}
        </div>
        {item?.image && (
          <Image
            className={styles.windowItemImage}
            src={item.image}
            width={400}
            height={400}
            alt=""
            layout="fill"
            quality={10}
          />
        )}
        <div className={styles.windowDots}>
          {[...Array(210)].map((_, i) => (
            <div
              style={{
                '--row': Math.floor(i / 14),
                '--cell': i % 14,
              }}
              key={`${item.uid}_${i}`}
            >
              {/* {!item.title ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
                    fill="currentColor"
                  />
                </svg>
              ) : null} */}
            </div>
          ))}
        </div>
      </LinkWrap>
    </div>
  )
}

const Grid = ({ isLoaded, activeFilter, items, handleMouseEnter, onLoad }) => {
  const [loadedImages, setLoadedImages] = React.useState(0)

  const handleImageLoad = React.useCallback(() => {
    setLoadedImages((i) => i + 1)
  }, [])

  React.useEffect(() => {
    if (loadedImages >= items.length - 1) {
      onLoad()
    }
  }, [loadedImages, items.length, onLoad])

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
              [styles['is-visible']]: loadedImages && isVisible,
              [styles['is-loaded']]: isLoaded,
              [styles['is-extra']]: !item.name,
            })}
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
                      {item?.image && (
                        <Image
                          className={styles.image}
                          src={item.image}
                          width={1080}
                          height={1350}
                          alt=""
                          layout="fill"
                          quality={50}
                          onLoadingComplete={() => {
                            handleImageLoad(item.uid)
                          }}
                        />
                      )}
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
              <>
                <Link href={item?.url} prefetch={false}>
                  <a className={styles.link}>
                    <div className={styles.itemInner}>
                      {/* <div className={styles.content}>
                        <p>{item.title}</p>
                      </div> */}
                    </div>
                  </a>
                </Link>
                <div className={styles.dots}>
                  {[...Array(9)].map((_, i) => (
                    <div key={`${itemIndex}_${i}`}></div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className={styles.link}>
                  {/* <div className={styles.itemInner}>
                  <div className={styles.content}>
                    <p>{item.title}</p>
                  </div>
                </div> */}
                </div>
                <div className={styles.dots}>
                  {[...Array(9)].map((_, i) => (
                    <div key={`${itemIndex}_${i}`}></div>
                  ))}
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

const ProjectsGrid = ({ items, activeFilter, setActiveItem, activeItem }) => {
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
        }}
        isLoaded={isLoaded}
        items={items}
        activeFilter={activeFilter}
        handleMouseEnter={handleMouseEnter}
      />
    ),
    [items, activeFilter, handleMouseEnter, isLoaded]
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
      </div>
    </div>
  )
}

export default ProjectsGrid
