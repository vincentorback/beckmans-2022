import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from '../Image'
import classNames from 'classnames'
import styles from './grid.module.css'
import { slugify, randomColor, randomBetween } from '../../lib/utilities'

const extraInfo = [
  {
    title: 'Examensutställning 19-24 maj',
    subtitle: 'Brahegatan 10 i Stockholm',
  },
  {
    title: 'Modevisning 17 maj kl 18:00',
    subtitle: 'Brahegatan 10 i Stockholm',
  },
  {
    title: 'Läs om vilka som tagit fram uställningen',
    subtitle: '',
    link: '/om-oss',
  },
  {
    title: 'Vill du söka till Beckmans 2023?',
    subtitle: 'Gör det! Sista ansökningsdagen är den 15 maj',
    link: 'https://beckmans.se',
  },
  {
    title: 'Den här hemsidan är gjord av Vincent Orback',
    subtitle: 'www.vincentorback.se',
    link: 'https://www.vincentorback.se',
  },
]

const colors = [...Array(100)].fill(0).map(() => randomColor())

const DEFAULT_FILTER = null

const Grid = ({ filters, items, activeFilter }) => {
  const [isAnimating, setAnimating] = React.useState(false)
  const [activeItems, setActiveItems] = React.useState(
    items.map((item) => `/${slugify(item.data.category)}/${item.uid}`)
  )
  const [grid, setGrid] = React.useState([0, 0])

  const router = useRouter()

  React.useEffect(() => {
    const changeStart = (foo) => {
      setAnimating(true)
      setActiveItems([foo])
    }

    router.events.on('routeChangeStart', changeStart)

    return () => router.events.off('routeChangeStart', changeStart)
  }, [])

  React.useEffect(() => {
    const calculate = () => {
      console.log('new calc')

      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      const gridRowLength = Math.round(windowWidth / 250)
      const gridColumnLength = Math.ceil(items.length / gridRowLength)

      console.log(gridRowLength, gridColumnLength)

      setGrid([gridRowLength, gridColumnLength])
    }

    window.addEventListener('resize', calculate)
    calculate()

    return () => window.removeEventListener('resize', calculate)
  }, [items.length])

  React.useEffect(() => {
    const setItems = () => {
      setActiveItems(
        items
          .filter(
            (item) => !activeFilter || item.data.category === activeFilter
          )
          .map((item) => `/${slugify(item.data.category)}/${item.uid}`)
      )
    }

    if (items) {
      setItems()
    }
  }, [items, activeFilter])

  const test = React.useMemo(() => {
    if (!Array.isArray(grid)) return null
    const emptySlots = grid[0] * grid[1] - items.length
    if (emptySlots <= 0) return items

    let test = [...items]

    let randomItems = [...Array(Math.min(extraInfo.length, emptySlots))]
      .fill(0)
      .map((_, index) => ({
        ...extraInfo[index],
        uid: `extra_${index}`,
      }))

    // randomItems = [...Array(Math.round(grid[0] / grid[1]))]
    //   .fill(0)
    //   .map((_, index) => ({
    //     uid: index,
    //   }))

    randomItems.forEach((item, index) => {
      test.splice(
        randomBetween(
          index * (test.length / extraInfo.length) + 1,
          Math.min(
            items.length,
            (index + 1) * (test.length / extraInfo.length) + 1
          )
        ),
        0,
        item
      )
    })

    return test.map((item, i) => ({
      ...item,
      color: item.data ? colors[i] : '#000',
    }))
  }, [items, grid])

  const steps = React.useCallback(() => {
    setAnimating(true)
    let iteration = 0

    let interval = setInterval(() => {
      const asd = items
        .filter((item, index) => index === iteration)
        .map((item) => `/${slugify(item.data.category)}/${item.uid}`)

      setActiveItems(asd)

      if (iteration === items.length) {
        clearInterval(interval)
        setAnimating(false)
      }

      iteration += 1
    }, 300)
  }, [items])

  const blink = React.useCallback(() => {
    setAnimating(true)
    let blink = 0
    let iteration = 0

    let interval = setInterval(() => {
      const asd = items
        .filter(
          (item, index) => blink === (index + Math.floor(index / grid[0])) % 2
        )
        .map((item) => `/${slugify(item.data.category)}/${item.uid}`)

      if (iteration === 10) {
        clearInterval(interval)
        setAnimating(false)
      }

      blink = blink === 1 ? 0 : 1
      iteration += 1

      setActiveItems(asd)
    }, 300)
  }, [items, grid[0]])

  const diagonal = React.useCallback(() => {
    setAnimating(true)
    let iteration = 0

    let interval = setInterval(() => {
      const active = items
        .filter((item, index) => {
          const row = Math.floor(index / grid[0])
          return index === row * grid[0] + (iteration - row)
        })
        .map((item) => `/${slugify(item.data.category)}/${item.uid}`)

      if (iteration === items.length / grid[0] + grid[0]) {
        clearInterval(interval)
        setAnimating(false)
      }

      iteration += 1

      setActiveItems(active)
    }, 100)
  }, [items, grid[0]])

  return (
    <div className={styles.container}>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: Array(grid[0]).fill('1fr').join(' '),
        }}
      >
        {test &&
          test.map((item, itemIndex) => (
            <div
              key={item.uid || itemIndex}
              className={classNames(styles.item, {
                [styles['is-active']]:
                  !item.data ||
                  activeItems.includes(
                    `/${slugify(item.data.category)}/${item.uid}`
                  ),
                [styles['is-animating']]: isAnimating,
                [styles['is-extra']]: !item.data,
              })}
              style={{
                backgroundColor: item.color,
              }}
            >
              {item.data ? (
                <>
                  <Link
                    href={`/${slugify(item.data.category)}/${item.uid}`}
                    prefetch={false}
                  >
                    <a
                      className={styles.link}
                      disabled={
                        !activeItems.includes(
                          `/${slugify(item.data.category)}/${item.uid}`
                        )
                      }
                    >
                      <div className={styles.itemInner}>
                        <div className={styles.content}>
                          <p>{item.data.title[0].text}</p>
                          <p>{item.data.category}</p>
                        </div>
                        {/* <Image
                        className={styles.image}
                        src={item.data.main_image.url}
                        width={item.data.main_image.dimensions.width || 400}
                        height={item.data.main_image.dimensions.height || 400}
                        alt={item.data.main_image.alt}
                        layout="fill"
                      /> */}
                      </div>
                    </a>
                  </Link>
                  <div className={styles.dots}>
                    {[...Array(9)].map((_, i) => (
                      <div key={`${itemIndex}_${i}`}></div>
                    ))}
                  </div>
                </>
              ) : item.link ? (
                <Link href={item?.link}>
                  <a className={styles.link}>
                    <div className={styles.itemInner}>
                      <div className={styles.content}>
                        <p>{item.title}</p>
                        {item.subtitle && <p>{item.subtitle}</p>}
                      </div>
                    </div>
                  </a>
                </Link>
              ) : (
                <div className={styles.link}>
                  <div className={styles.itemInner}>
                    <div className={styles.content}>
                      <p>{item.title}</p>
                      {item.subtitle && <p>{item.subtitle}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Grid
