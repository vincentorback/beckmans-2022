import React from 'react'
import Link from 'next-translate-routes/link'
import classNames from 'classnames'
import styles from './projectLists.module.css'
import { slugify } from '../../lib/utilities'
import { useTranslations } from 'next-intl'

const ProjectLists = ({ lists, items }) => {
  const t = useTranslations('categories')

  return (
    <ul className={styles.container} role="tree" aria-label="Studenter">
      {lists &&
        lists.map((list, listIndex) => (
          <li key={list.id} role="treeitem" tabIndex="-1">
            <span className={styles.title}>{t(list.id)}</span>
            <ul className={styles.list} role="group">
              {list.items.map((item, itemIndex) => (
                <li
                  className={styles.item}
                  key={item.uid}
                  role="treeitem"
                  tabIndex="-1"
                >
                  <Link href={item.url}>
                    <a>
                      <span>{item.name}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
    </ul>
  )
}

export default ProjectLists
