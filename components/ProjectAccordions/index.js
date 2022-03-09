import React from 'react'
import Image from '../Image'
import Link from 'next-translate-routes/link'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { SESSION_CATEGORY } from '../../lib/constants'
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
    (id) => {
      setActiveAccordion((previousList) => {
        const newActiveList =
          previousList === id ? null : lists.find((list) => list.id === id)

        if (newActiveList?.id) {
          sessionStorage[SESSION_CATEGORY] = newActiveList.id
        } else {
          delete sessionStorage[SESSION_CATEGORY]
        }

        if (
          previousList &&
          newActiveList &&
          newActiveList.index > previousList.index &&
          listRefs?.current?.length
        ) {
          listRefs.current[0].scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }

        return newActiveList ? newActiveList.id : newActiveList
      })
    },
    [lists]
  )

  React.useEffect(() => {
    if (sessionStorage[SESSION_CATEGORY]) {
      const savedList = lists.find(
        (list) => list.id === sessionStorage[SESSION_CATEGORY]
      )

      if (savedList?.id) {
        setActiveAccordion(savedList.id)
      }
    }
  }, [lists])

  return (
    <div className={styles.container}>
      {lists &&
        lists.map((list) => (
          <div
            className={classNames(styles.list, {
              [styles['is-active']]: activeAccordion === list.id,
            })}
            ref={(el) =>
              el && !listRefs.current.includes(el) && listRefs.current.push(el)
            }
            key={list.id}
          >
            <button
              id={`accordion-${list.id}-button`}
              className={styles.button}
              aria-expanded={activeAccordion === list.id}
              aria-controls={`accordion-${list.id}-content`}
              onClick={() => handleToggleAccordion(list.id)}
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
              role="region"
              aria-labelledby={`accordion-${list.id}-button`}
              id={`accordion-${list.id}-content`}
              className={styles.content}
              style={{
                maxHeight: maxHeight
                  ? activeAccordion === list.id
                    ? maxHeight
                    : 0
                  : null,
              }}
            >
              {list.items.map((item, itemIndex) => (
                <div className={styles.item} key={item.uid}>
                  <Link href={item.url} prefetch={false}>
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
