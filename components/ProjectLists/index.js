import React from 'react'
import Link from 'next-translate-routes/link'
import classNames from 'classnames'
import { slugify } from '../../lib/utilities'
import { useTranslations } from 'next-intl'

const ProjectLists = ({ setActiveItem, activeItem, lists, items }) => {
  const t = useTranslations('categories')

  const handleMouseEnter = React.useCallback(
    (item) => {
      setActiveItem(item)
    },
    [setActiveItem]
  )

  return (
    <ul className="Lists" role="tree" aria-label="Studenter">
      {lists &&
        lists.map((list, listIndex) => (
          <li key={list.id} role="treeitem" tabIndex="-1">
            <span className="Lists-title">{t(list.id)}</span>
            <ul className="Lists-list" role="group">
              {list.items.map((item, itemIndex) => (
                <li
                  className="Lists-item"
                  key={item.uid}
                  role="treeitem"
                  tabIndex="-1"
                >
                  <Link href={item.url} scroll={false}>
                    <a onMouseEnter={() => handleMouseEnter(item)}>
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
