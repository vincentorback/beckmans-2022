import React from 'react'
import Image from '../Image'
import LinkWrap from '../LinkWrap'
import { isEmpty } from '../../lib/utilities'
import { useTranslations } from 'next-intl'
import { m } from 'framer-motion'

const Window = ({ item, previousItem }) => {
  const [isLoaded, setIsLoaded] = React.useState(isEmpty(item?.image))

  const t = useTranslations('categories')

  if (!item?.uid) return null
  // {
  //   item = {
  //     uid: 'fallback',
  //     name: 'Examensutställning',
  //     subtitle: '19.5–24.5.2022',
  //     background: 'var(--color-white)',
  //     color: 'var(--color-black)',
  //   }
  // }

  return (
    <m.div
      className="ProjectsGrid-window"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        animate: {
          opacity: 1,
        },
        exit: {
          opacity: 0,
          transition: {
            duration: 0.4,
          },
        },
      }}
    >
      {previousItem?.uid && previousItem.uid !== item.uid && (
        <div
          key={previousItem.uid}
          className="ProjectsGrid-windowItem"
          id="prev"
        >
          <div
            className="ProjectsGrid-windowItemInner"
            style={{
              backgroundColor: previousItem.background ?? null,
              color: previousItem.color ?? null,
            }}
          >
            <div className="ProjectsGrid-windowContent">
              <p>
                {previousItem.name ? previousItem.name : previousItem.title}
              </p>
              {previousItem.category && <p>{t(previousItem.category)}</p>}
              {previousItem.subtitle && <p>{previousItem.subtitle}</p>}
            </div>
            {previousItem?.image && (
              <Image
                alt=""
                className="ProjectsGrid-windowItemImage"
                width={(1440 / 12) * 6 * 2}
                height={(1440 / 12) * 6 * 2 * 1.1671511628}
                layout="fill"
                quality={10}
                sizes="(max-width: 1400px) 50vw, 686px"
                src={previousItem.image}
              />
            )}
          </div>
        </div>
      )}
      <div className="ProjectsGrid-windowItem" key={item.uid}>
        <LinkWrap url={item.url}>
          <m.div
            className="ProjectsGrid-windowItemInner"
            initial="loading"
            animate={isLoaded ? 'complete' : 'loading'}
            style={{
              backgroundColor: item.background ?? null,
              color: item.color ?? null,
            }}
            variants={{
              loading: { opacity: 0, scale: 0.98 },
              complete: {
                transition: { duration: 0.1, delay: 0.05 },
                opacity: 1,
                scale: 1,
              },
            }}
          >
            <div className="ProjectsGrid-windowContent">
              <p>{item.name ? item.name : item.title}</p>
              {item.category && <p>{t(item.category)}</p>}
              {item.subtitle && <p>{item.subtitle}</p>}
            </div>
            {item?.image && (
              <Image
                alt=""
                className="ProjectsGrid-windowItemImage"
                width={(1440 / 12) * 6 * 2}
                height={(1440 / 12) * 6 * 2 * 1.1671511628}
                layout="fill"
                quality={10}
                sizes="(max-width: 1400px) 50vw, 686px"
                src={item.image}
                onLoadingComplete={() => {
                  setIsLoaded(true)
                }}
              />
            )}
          </m.div>
        </LinkWrap>
      </div>
      <div className="ProjectsGrid-windowDots">
        {[...Array(9)].map((_, dotIndex) => (
          <div key={`dot_${dotIndex}`} />
        ))}
      </div>
    </m.div>
  )
}

export default Window
