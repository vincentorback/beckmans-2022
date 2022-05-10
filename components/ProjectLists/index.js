import React from 'react'
import Link from 'next-translate-routes/link'
import { linkResolver } from '../../lib/prismic'
import { PrismicText } from '@prismicio/react'
import { m } from 'framer-motion'

const ProjectLists = ({ lists, isReady, setActiveItem }) => {
  return (
    <m.ul
      className="Lists"
      role="tree"
      aria-label="Studenter"
      initial="initial"
      animate={isReady && 'animate'}
      exit="exit"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            ease: 'easeInOut',
            delay: 0.3,
            duration: 0.6,
          },
        },
        exit: {
          opacity: 0,
          transition: {
            ease: 'easeInOut',
            delay: 0.3,
            duration: 0.4,
          },
        },
      }}
    >
      {lists &&
        lists.map((list) => (
          <li key={list.id} role="treeitem" tabIndex="-1">
            <span className="Lists-title">{list.label}</span>
            <ul className="Lists-list" role="group">
              {list.items.map((item) => (
                <li
                  key={item.uid}
                  className="Lists-item"
                  role="treeitem"
                  tabIndex="-1"
                >
                  <Link
                    href={linkResolver(item)}
                    scroll={false}
                    prefetch={false}
                  >
                    <a
                      className="Lists-itemLink"
                      onMouseEnter={
                        setActiveItem ? () => setActiveItem(item) : null
                      }
                      onTouchStart={
                        setActiveItem ? () => setActiveItem(item) : null
                      }
                    >
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
