import React from 'react'
import Link from 'next-translate-routes/link'
import Image from '../Image'
import classNames from 'classnames'
import styles from './index.module.css'
import { slugify } from '../../lib/utilities'
import { useTranslations } from 'next-intl'
// import { useRouter } from 'next/router'

const Window = ({ item }) => {
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
          <Link href={item.url}>
            <a className={styles.windowLink}>{children}</a>
          </Link>
        )
      }

      return children
    },
    [item]
  )

  return (
    <div className={styles.windowItem} data-id={item.uid} key={item.uid}>
      <LinkWrap>
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
            [styles['is-visible']]: item.title,
          })}
        >
          {[...Array(9)].map((_, i) => (
            <div key={`${item.uid}_${i}`}>{!item.title && '←'}</div>
          ))}
        </div>
      </LinkWrap>
    </div>
  )
}

const Grid = ({ isLoaded, activeFilter, items, handleMouseEnter }) => {
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
                          width={100}
                          height={100}
                          alt=""
                          layout="fill"
                          quality={10}
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
              <Link href={item?.url}>
                <a className={styles.link}>
                  <div className={styles.itemInner}>
                    {/* <div className={styles.content}>
                      <p>{item.title}</p>
                    </div> */}
                  </div>
                </a>
              </Link>
            ) : (
              <div className={styles.link}>
                {/* <div className={styles.itemInner}>
                  <div className={styles.content}>
                    <p>{item.title}</p>
                  </div>
                </div> */}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const ProjectsGrid = ({ items, activeFilter, setActiveItem, activeItem }) => {
  // const { locale } = useRouter()
  const [isLoaded, setIsLoaded] = React.useState(true)

  // const testItems = React.useMemo(() => {
  //   return items.concat({
  //     uid: 'all',
  //     title:
  //       locale === 'sv' ? 'Ansök på \nbeckmans.se' : 'Apply on \nbeckmans.se',
  //     url: 'https://beckmans.se/',
  //     url: '#/',
  //   })
  // }, [items, locale])

  // console.log(testItems.length)

  // React.useEffect(() => {
  //   let timout = setTimeout(() => {
  //     setIsLoaded(true)
  //   }, 3000)

  //   return () => clearTimeout(timout)
  // }, [])

  const handleMouseEnter = React.useCallback(
    (item) => {
      setActiveItem(item)
    },
    [setActiveItem]
  )

  const memoGrid = React.useMemo(
    () => (
      <Grid
        items={items}
        activeFilter={activeFilter}
        handleMouseEnter={handleMouseEnter}
        isLoaded={isLoaded}
      />
    ),
    [items, activeFilter, handleMouseEnter, isLoaded]
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
