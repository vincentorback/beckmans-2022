import React from 'react'
import Link from 'next-translate-routes/link'
import Image from '../Image'
import classNames from 'classnames'
import styles from './projectsGrid.module.css'
import { slugify } from '../../lib/utilities'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const AnimatedItem = ({ isActive, children, index }) => (
  <motion.div
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
    // variants={variants} // Pass the variant object into Framer Motion
    // initial="hidden" // Set the initial state to variants.hidden
    // animate="enter" // Animated state to variants.enter
    // exit="exit" // Exit state (used later) to variants.exit
    // transition={{ type: 'ease' }} // Set the transition to linear
  >
    {children}
  </motion.div>
)

const WindowLinkWrap = ({ item, children }) => {
  if (item.url) {
    return (
      <Link href={item.url}>
        <a className={styles.windowLink}>{children}</a>
      </Link>
    )
  }

  return children
}

const Window = ({ isLoaded, item }) => {
  if (!item) {
    item = {
      uid: 123,
    }
  }

  const t = useTranslations('categories')

  // const [test, setTest] = React.useState(0)
  // React.useEffect(() => {
  //   let i = 0
  //   const foo = setInterval(() => {
  //     i += 1

  //     if (i > 100) {
  //       return clearInterval(foo)
  //       setTest(1 * 28)
  //     }

  //     setTest((v) => (v < 210 ? v + 1 : -1))
  //   }, 100)

  //   return () => clearInterval(foo)
  // }, [])

  return (
    <div
      className={classNames(styles.windowItem, {
        [styles['is-active']]: item.uid !== 123,
        [styles['is-loaded']]: isLoaded,
      })}
      style={{
        backgroundColor: item.color ?? null,
      }}
      key={item.uid}
    >
      <WindowLinkWrap item={item}>
        <div className={styles.windowContent}>
          <p>{item.name ? item.name : item.title}</p>
          {item.category && <p>{t(item.category)}</p>}
          {item.subtitle && <p>{item.subtitle}</p>}
        </div>
        {item?.image && (
          <Image
            className={styles.windowItemImage}
            src={item.image}
            width={1158}
            height={1352}
            alt=""
            layout="fill"
            quality={10}
            priority
          />
        )}
      </WindowLinkWrap>
    </div>
  )
}

const Grid = ({ isLoaded, activeFilter, items, handleMouseEnter, onLoad }) => {
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

  return (
    <div className={styles.grid}>
      {items.map((item, itemIndex) => {
        const isVisible =
          isLoaded &&
          (!activeFilter ||
            (!item.name && !activeFilter) ||
            (item.name && item.category === activeFilter))

        return (
          <div
            key={item.uid || itemIndex}
            className={classNames(styles.item, {
              [styles['is-visible']]: isVisible,
              [styles['is-loaded']]: isLoaded,
              [styles['is-extra']]: !item.name,
            })}
            onMouseEnter={() => handleMouseEnter(item)}
          >
            {item.name ? (
              <Link href={item.url}>
                <a
                  className={styles.link}
                  // disabled={
                  //   !activeItems.includes(
                  //     `/${slugify(item.category)}/${item.uid}`
                  //   )
                  // }
                >
                  <div className={styles.itemInner}>
                    <AnimatedItem isActive={isVisible} index={itemIndex}>
                      {item?.image && (
                        <Image
                          className={styles.image}
                          src={item.image}
                          width={150}
                          height={150}
                          alt=""
                          layout="fixed"
                          quality={50}
                          priority
                          onLoadingComplete={() => {
                            handleImageLoad(item.uid)
                          }}
                        />
                      )}
                    </AnimatedItem>
                  </div>
                </a>
              </Link>
            ) : item.url ? (
              <Link href={item?.url}>
                <a className={styles.link}>
                  <AnimatedItem isActive={isVisible} index={itemIndex}>
                    <div className={styles.itemInner} />
                  </AnimatedItem>
                </a>
              </Link>
            ) : (
              <div className={styles.link}>
                <AnimatedItem isActive={isVisible} index={itemIndex}>
                  <div className={styles.itemInner} />
                </AnimatedItem>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const ProjectsGrid = ({
  setReady,
  items,
  activeFilter,
  setActiveItem,
  activeItem,
}) => {
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
          setReady(true)
        }}
        isLoaded={isLoaded}
        items={items}
        activeFilter={activeFilter}
        handleMouseEnter={handleMouseEnter}
      />
    ),
    [items, activeFilter, setReady, handleMouseEnter, isLoaded]
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
        <div
          className={classNames(styles.dots, {
            [styles['is-loaded']]: isLoaded,
          })}
        >
          {[...Array(375)].map((_, i) => (
            <div
              style={{
                '--row': Math.floor(i / 25),
                '--cell': Math.floor(i % 25),
                opacity:
                  !isLoaded || (isLoaded && Math.floor(i % 25) < 13) ? 1 : 0,
              }}
              key={`dot_${i}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectsGrid
