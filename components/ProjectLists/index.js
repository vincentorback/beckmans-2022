import React from 'react'
import Link from 'next-translate-routes/link'
import classNames from 'classnames'
import styles from './projectLists.module.css'
import { slugify } from '../../lib/utilities'
import { useTranslations } from 'next-intl'

const ProjectLists = ({ lists, items, setActiveItem, activeItem }) => {
  const t = useTranslations('categories')

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
              <Link href={slugify(t(list.id))}>
                <a>{t(list.id)}</a>
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
                  <Link href={item.url}>
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
