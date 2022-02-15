import React from 'react'
import Image from '../Image'
import Link from 'next-translate-routes/link'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import styles from './projectAccordions.module.css'

const ProjectAccordions = ({ lists, items }) => {
  const { locale } = useRouter()
  const t = useTranslations('categories')

  const listRefs = React.useRef([])
  const [maxHeight, setMaxHeight] = React.useState(0)

  const [activeAccordion, setActiveAccordion] = React.useState(null)

  React.useEffect(() => {
    listRefs.current.forEach((el) => {
      if (el) {
        setMaxHeight((prev) => Math.max(prev, el.clientHeight))
      }
    })
  }, [listRefs])

  const handleToggleAccordion = React.useCallback(
    (index) => {
      const newAccordion = activeAccordion === index ? null : index
      setActiveAccordion(newAccordion)
      sessionStorage.accordion = newAccordion
    },
    [activeAccordion]
  )

  React.useEffect(() => {
    if (listRefs?.current[activeAccordion]) {
      setTimeout(() => {
        listRefs?.current[Math.max(0, activeAccordion - 1)].scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        })
      })
    }
  }, [listRefs, activeAccordion])

  React.useEffect(() => {
    if (sessionStorage.accordion) {
      setActiveAccordion(
        sessionStorage.accordion === 'null' ? null : sessionStorage.accordion
      )
    }
  }, [])

  return (
    <div className={styles.container}>
      {lists &&
        lists.map((list, listIndex) => (
          <div
            className={classNames(styles.list, {
              [styles['is-active']]: listIndex === activeAccordion,
            })}
            ref={(el) =>
              el && !listRefs.current.includes(el) && listRefs.current.push(el)
            }
            key={list.id}
          >
            <button
              className={styles.button}
              aria-expanded={listIndex === list.id}
              onClick={() => handleToggleAccordion(listIndex)}
            >
              <span>{t(list.id)}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <line
                  x1="10"
                  y1="20"
                  x2="10"
                  y2="4.80825e-08"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  y1="10"
                  x2="20"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <div
              className={styles.content}
              style={{
                maxHeight: maxHeight
                  ? listIndex === activeAccordion
                    ? maxHeight
                    : 0
                  : null,
              }}
            >
              {list.items.map((item, itemIndex) => (
                <div className={styles.item} key={item.uid}>
                  <Link href={item.url}>
                    <a className={styles.link}>
                      <div className={styles.content}>
                        <p>{item.name}</p>
                        <p>{item.title[locale]}</p>
                      </div>
                      <div className={styles.imageWrap}>
                        <Image
                          src={item.image}
                          width={110}
                          height={110}
                          alt={item.name}
                          className={styles.image}
                          layout="responsive"
                          priority={itemIndex <= 3}
                        />
                        <div className={styles.dots}>
                          {[...Array(9)].map((_, i) => (
                            <div
                              style={{
                                '--row': Math.floor(i / 3),
                                '--cell': i % 3,
                              }}
                              key={`${item.uid}_${i}`}
                            />
                          ))}
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

export default ProjectAccordions
