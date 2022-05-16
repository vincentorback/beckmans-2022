import React from 'react'
import Image from '../Image'
import Link from 'next-translate-routes/link'
import classNames from 'classnames'
import { SESSION_CATEGORY } from '../../lib/constants'
import { m } from 'framer-motion'
import { PrismicText } from '@prismicio/react'
import { linkResolver } from '../../lib/prismic'

const ProjectAccordions = ({ lists }) => {
  const listRefs = React.useRef([])
  const [activeAccordion, setActiveAccordion] = React.useState(null)

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
    <div className="Accordions">
      {lists &&
        lists.map((list) => (
          <m.div
            className={classNames('Accordions-list', {
              'is-active': activeAccordion === list.id,
            })}
            ref={(el) =>
              el && !listRefs.current.includes(el) && listRefs.current.push(el)
            }
            key={list.id}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: {
                opacity: 0,
                y: 3,
              },
              animate: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.3,
                  delay: 0.05 * (lists.length - list.index),
                },
              },
              exit: {
                opacity: 0,
                y: 3,
              },
            }}
          >
            <button
              id={`accordion-${list.id}-button`}
              className="Accordions-button"
              aria-expanded={activeAccordion === list.id}
              aria-controls={`accordion-${list.id}-content`}
              onClick={() => handleToggleAccordion(list.id)}
            >
              <span className="Accordions-buttonText">{list.label}</span>
              <svg
                className="Accordions-buttonSymbol"
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
                maxHeight: activeAccordion === list.id ? null : 0,
              }}
            >
              {list.items.map((item, itemIndex) => (
                <div className="Accordions-item" key={item.uid}>
                  <Link
                    href={linkResolver(item)}
                    scroll={false}
                    prefetch={false}
                  >
                    <a className="Accordions-link">
                      <div className="Accordions-itemContent">
                        <p>
                          <PrismicText field={item.data.name} />
                        </p>
                        {Boolean(item?.data?.project_title?.length) && (
                          <p className="u-textPreLine">
                            <PrismicText field={item.data.project_title} />
                          </p>
                        )}
                      </div>
                      <div className="Accordions-imageWrap">
                        <Image
                          className="Accordions-image"
                          src={item.data.main_image}
                          width={114}
                          height={114}
                          alt=""
                          priority={itemIndex <= 3}
                        />
                        <ImageDots />
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </m.div>
        ))}
    </div>
  )
}

const ImageDots = () =>
  React.useMemo(
    () => (
      <div className="Accordions-dots">
        {[...Array(9)].map((_, i) => (
          <div
            style={{
              '--row': Math.floor(i / 3),
              '--cell': i % 3,
            }}
            key={i}
          />
        ))}
      </div>
    ),
    []
  )

export default ProjectAccordions
