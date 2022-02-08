import React from 'react'
import Image from '../Image'
import Link from 'next-translate-routes/link'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import styles from './projectAccordions.module.css'

const ProjectAccordions = ({ items }) => {
  const { locale } = useRouter()
  const t = useTranslations()

  const [activeAccordion, setAccordion] = React.useState(null)

  const lists = React.useMemo(
    () =>
      [
        items.filter((item) => item.category === 'form'),
        items.filter((item) => item.category === 'visual-communication'),
        items.filter((item) => item.category === 'fashion'),
      ].map((items) => ({
        items,
        id: items[0].category,
      })),
    [items]
  )

  return (
    <div className={styles.container}>
      {lists &&
        lists.map((list, listIndex) => (
          <div
            className={classNames(styles.list, {
              [styles['is-active']]: list.id === activeAccordion,
            })}
            key={list.id}
          >
            <button
              onClick={() =>
                setAccordion((activeId) =>
                  activeId === list.id ? null : list.id
                )
              }
            >
              <span>{t(`categories.${list.id}`)}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
            <div className={styles.listContent}>
              {list.items.map((item, itemIndex) => (
                <div className={styles.item} key={item.uid}>
                  <Link href={item.url}>
                    <a>
                      <div className={styles.content}>
                        <p>{item.name}</p>
                        <p>{item.title[locale]}</p>
                      </div>
                      <div className={styles.imageWrap}>
                        <Image
                          src={item.image}
                          width={110}
                          height={110}
                          alt=""
                          className={styles.image}
                          layout="responsive"
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
