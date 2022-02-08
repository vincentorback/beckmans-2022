import React from 'react'
import Link from 'next-translate-routes/link'
import classNames from 'classnames'
import styles from './projectLists.module.css'
import { slugify } from '../../lib/utilities'
import { useTranslations } from 'next-intl'

const ProjectLists = ({ items, setActiveItem, activeItem }) => {
  const t = useTranslations()

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

  // const handleMouseEnter = React.useCallback(
  //   (item) => {
  //     setActiveItem(item)
  //   },
  //   [setActiveItem]
  // )

  return (
    <div className={styles.container}>
      {lists &&
        lists.map((list, listIndex) => (
          <div className={styles.cell} key={list.id}>
            <h2 className={styles.title}>
              <Link href={slugify(t(`categories.${list.id}`))} prefetch={false}>
                <a>{t(`categories.${list.id}`)}</a>
              </Link>
            </h2>
            <div className={styles.list}>
              {list.items.map((item, itemIndex) => (
                <p
                  // className={classNames({
                  //   [styles['is-active']]:
                  //     activeItem && activeItem.uid === item.uid,
                  // })}
                  key={item.uid}
                  // onMouseEnter={() => handleMouseEnter(item)}
                >
                  <Link href={item.url} prefetch={false}>
                    <a>
                      <span>{item.name}</span>
                    </a>
                  </Link>
                </p>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

export default ProjectLists
