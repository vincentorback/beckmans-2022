import React from 'react'
import Image from '../Image'
import LinkWrap from '../LinkWrap'
import { slugify, isEmpty } from '../../lib/utilities'
import { useTranslations } from 'next-intl'
import { m } from 'framer-motion'
import { linkResolver } from '../../lib/prismic'
import { PrismicText } from '@prismicio/react'

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
                {previousItem.title ? (
                  previousItem.title
                ) : (
                  <PrismicText field={previousItem.data.name} />
                )}
              </p>
              {previousItem?.data?.category && (
                <p>{t(slugify(previousItem.data.category))}</p>
              )}
              {previousItem.subtitle && <p>{previousItem.subtitle}</p>}
            </div>
            {previousItem?.data?.main_image?.url && (
              <Image
                alt=""
                className="ProjectsGrid-windowItemImage"
                width={(1440 / 12) * 6}
                height={(1440 / 12) * 6 * 1.1671511628}
                layout="responsive"
                quality={10}
                sizes="(max-width: 1400px) 50vw, 686px"
                src={previousItem.data.main_image}
              />
            )}
          </div>
        </div>
      )}
      <div className="ProjectsGrid-windowItem" key={item.uid}>
        <LinkWrap url={linkResolver(item)}>
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
                transition: { duration: 0.1 },
                opacity: 1,
                scale: 1,
              },
            }}
          >
            <div className="ProjectsGrid-windowContent">
              <p>
                {item.title ? (
                  item.title
                ) : (
                  <PrismicText field={item.data.name} />
                )}
              </p>
              {item?.data?.category && <p>{t(slugify(item.data.category))}</p>}
              {item.subtitle && <p>{item.subtitle}</p>}
            </div>
            {item?.data?.main_image?.url && (
              <Image
                alt=""
                className="ProjectsGrid-windowItemImage"
                width={(1440 / 12) * 6}
                height={(1440 / 12) * 6 * 1.1671511628}
                layout="responsive"
                sizes="(max-width: 1400px) 50vw, 686px"
                src={item?.data?.main_image}
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
