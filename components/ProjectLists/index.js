import React from 'react'
import Link from 'next-translate-routes/link'
import { useTranslations } from 'next-intl'
import { linkResolver } from '../../lib/prismic'
import { PrismicText } from '@prismicio/react'
import { m } from 'framer-motion'

const ProjectLists = ({ lists }) => {
  const t = useTranslations('categories')

  return (
    <m.ul
      className="Lists"
      role="tree"
      aria-label="Studenter"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: {
          opacity: 0,
          y: 30,
        },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            ease: 'easeInOut',
            delay: 0.8,
            duration: 0.4,
          },
        },
        exit: {
          y: 30,
          opacity: 0,
          transition: {
            ease: 'easeInOut',
            delay: 0.8,
            duration: 0.4,
          },
        },
      }}
    >
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
                    <a className="Lists-itemLink">
                      <span className="Lists-itemText">
                        <PrismicText field={item.data.name} />
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
    </m.ul>
  )
}

export default ProjectLists
