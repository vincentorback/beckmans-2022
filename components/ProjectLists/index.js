import React from 'react'
import Link from 'next-translate-routes/link'
import classNames from 'classnames'
import styles from './index.module.css'
import { useTranslations } from 'next-intl'

const ProjectLists = ({ items, setActiveItem, activeItem }) => {
  const t = useTranslations()

  const lists = React.useMemo(
    () =>
      [
        items.filter((item) => item.category === 'fashion'),
        items.filter((item) => item.category === 'form'),
        items.filter((item) => item.category === 'visual-communication'),
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
          <div className={styles.cell} key={listIndex}>
            <h2 className={styles.title}>
              <Link href={`/${list.id}`}>
                <a>{t(`categories.${list.id}`)}</a>
              </Link>
            </h2>
            <div className={styles.list}>
              {list.items.map((item, itemIndex) => (
                <p
                  className={classNames({
                    [styles['is-active']]:
                      activeItem && activeItem.uid === item.uid,
                  })}
                  key={itemIndex}
                  onMouseEnter={() => setActiveItem(item)}
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
