import React from 'react'
import Link from 'next-translate-routes/link'
import { useTranslations } from 'next-intl'
import { linkResolver } from '../../lib/prismic'
import { PrismicText } from '@prismicio/react'

const ProjectLists = ({ setActiveItem, lists }) => {
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
        lists.map((list) => (
          <li key={list.id} role="treeitem" tabIndex="-1">
            <span className="Lists-title">{t(list.id)}</span>
            <ul className="Lists-list" role="group">
              {list.items.map((item) => (
                <li
                  key={item.uid}
                  className="Lists-item"
                  role="treeitem"
                  tabIndex="-1"
                >
                  <Link href={linkResolver(item)} scroll={false}>
                    <a onMouseEnter={() => handleMouseEnter(item)}>
                      <span>
                        <PrismicText field={item.data.name} />
                      </span>
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
