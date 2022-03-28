import React from 'react'
import Image from '../Image'
import Link from 'next-translate-routes/link'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { SESSION_CATEGORY } from '../../lib/constants'
import { m } from 'framer-motion'
import { linkResolver } from '../../lib/prismic'

const ProjectAccordions = ({ lists }) => {
  const { locale } = useRouter()

  const t = useTranslations('categories')

  const listRefs = React.useRef([])

  const [maxHeight, setMaxHeight] = React.useState(0)
  const [activeAccordion, setActiveAccordion] = React.useState(null)
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    window.requestAnimationFrame(() => {
      setIsReady(true)
    })
  }, [])

  React.useEffect(() => {
    listRefs.current.forEach((el) => {
      if (el) {
        setMaxHeight((prev) => Math.max(prev, el.clientHeight))
      }
    })
  }, [listRefs])

  const handleToggleAccordion = React.useCallback(
    (id) => {
      setActiveAccordion((previousListId) => {
        const newActiveList =
          previousListId === id ? null : lists.find((list) => list.id === id)

        if (newActiveList?.id) {
          sessionStorage[SESSION_CATEGORY] = newActiveList.id
        } else {
          delete sessionStorage[SESSION_CATEGORY]
        }

        const previousList = previousListId
          ? lists.find((list) => list.id === previousListId)
          : false

        if (
          previousList &&
          newActiveList &&
          newActiveList.index > previousList.index &&
          listRefs?.current?.length
        ) {
          setTimeout(() => {
            listRefs.current[0].scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }, 200)
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
    <m.div
      className={classNames('Accordions', {
        'is-ready': isReady,
      })}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
        exit: {
          opacity: 0,
        },
      }}
    >
      {lists &&
        lists.map((list) => (
          <div
            className={classNames('Accordions-list', {
              'is-active': activeAccordion === list.id,
            })}
            ref={(el) =>
              el && !listRefs.current.includes(el) && listRefs.current.push(el)
            }
            key={list.id}
          >
            <button
              id={`accordion-${list.id}-button`}
              className="Accordions-button"
              aria-expanded={activeAccordion === list.id}
              aria-controls={`accordion-${list.id}-content`}
              onClick={() => handleToggleAccordion(list.id)}
            >
              <span>{t(list.id)}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path stroke="currentColor" d="M10 20V0M0 10h20" />
              </svg>
            </button>
            <div
              role="region"
              aria-labelledby={`accordion-${list.id}-button`}
              id={`accordion-${list.id}-content`}
              className="Accordions-content"
              style={{
                maxHeight: maxHeight
                  ? activeAccordion === list.id
                    ? maxHeight
                    : 0
                  : null,
              }}
            >
              {list.items.map((item, itemIndex) => (
                <div className="Accordions-item" key={item.uid}>
                  <Link
                    href={linkResolver(item)}
                    prefetch={false}
                    scroll={false}
                  >
                    <a className="Accordions-link">
                      <div className="Accordions-content">
                        <p>{item.data.name[0].text}</p>
                        {Boolean(item?.data?.project_title.length) && (
                          <p>{item.data.project_title[0].text}</p>
                        )}
                      </div>
                      <div className="Accordions-imageWrap">
                        <Image
                          src={item.data.main_image}
                          width={110}
                          height={110}
                          alt=""
                          className="Accordions-image"
                          layout="responsive"
                          priority={itemIndex <= 3}
                        />
                        <div className="Accordions-dots">
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
    </m.div>
  )
}

export default ProjectAccordions
