import React from 'react'
import Image from '../Image'
import LinkWrap from '../LinkWrap'
import { slugify, isEmpty } from '../../lib/utilities'
import { useTranslations } from 'next-intl'
import { m } from 'framer-motion'
import { linkResolver } from '../../lib/prismic'
import { PrismicText } from '@prismicio/react'

const Window = ({ item, previousItem }) => {
  const [isLoaded, setIsLoaded] = React.useState(
    isEmpty(item?.data?.main_image)
  )

  const t = useTranslations('categories')

  if (!item?.uid) return null

  return (
    <m.div
      className="ProjectsGrid-window"
      initial="initial"
      exit="exit"
      variants={{
        initial: {
          opacity: 1,
        },
        exit: {
          opacity: 0,
          transition: {
            delay: 0.2,
            duration: 1,
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
              backgroundColor: previousItem?.data?.background_color
                ? `var(--color-${previousItem.data.background_color.toLowerCase()})`
                : previousItem?.background_color
                ? `var(--color-${previousItem.background_color.toLowerCase()})`
                : null,
            }}
          >
            <div className="ProjectsGrid-windowContent">
              {Boolean(
                previousItem?.data?.name || previousItem?.data?.title
              ) && (
                <p>
                  <PrismicText
                    field={
                      previousItem?.data?.name ?? previousItem?.data?.title
                    }
                  />
                </p>
              )}
              {previousItem?.title?.length && <p>{previousItem.title}</p>}
              {previousItem?.data?.category && (
                <p>{t(slugify(previousItem.data.category))}</p>
              )}
            </div>
            {previousItem?.data?.main_image?.url && (
              <Image
                className="ProjectsGrid-windowItemImage"
                width={(1440 / 12) * 6}
                height={(1440 / 12) * 6 * 1.1671511628}
                quality={50}
                src={previousItem.data.main_image}
                sizes="(max-width: 1400px) 50vw, 686px"
                layout="responsive"
                alt=""
              />
            )}
          </div>
        </div>
      )}
      <div className="ProjectsGrid-windowItem" key={item.uid}>
        <LinkWrap href={item.url ?? linkResolver(item)}>
          <m.div
            className="ProjectsGrid-windowItemInner"
            initial="loading"
            animate={isLoaded ? 'complete' : 'loading'}
            style={{
              backgroundColor: item?.data?.background_color
                ? `var(--color-${item.data.background_color.toLowerCase()})`
                : item?.background_color
                ? `var(--color-${item.background_color.toLowerCase()})`
                : null,
            }}
            variants={{
              loading: {
                opacity: 0,
                scale: 0.98,
              },
              complete: {
                transition: { duration: !previousItem ? 0.3 : 0.1 },
                opacity: 1,
                scale: 1,
              },
            }}
          >
            <div className="ProjectsGrid-windowContent">
              {Boolean(
                item?.data?.name?.length || item?.data?.title?.length
              ) && (
                <p>
                  <PrismicText field={item?.data?.name ?? item?.data?.title} />
                </p>
              )}
              {item?.title?.length && <p>{item.title}</p>}
              {item?.data?.category?.length && (
                <p>{t(slugify(item.data.category))}</p>
              )}
            </div>
            {item?.data?.main_image?.url && (
              <Image
                className="ProjectsGrid-windowItemImage"
                width={(1440 / 12) * 6}
                height={(1440 / 12) * 6 * 1.1671511628}
                quality={50}
                src={item.data.main_image}
                sizes="(max-width: 1400px) 50vw, 686px"
                layout="responsive"
                alt=""
                onLoadingComplete={() => {
                  setIsLoaded(true)
                }}
              />
            )}
          </m.div>
        </LinkWrap>
      </div>
      <WindowDots hideMiddle={!item?.data?.main_image} />
    </m.div>
  )
}

const WindowDots = ({ hideMiddle }) => (
  <div className="ProjectsGrid-windowDots">
    {[...Array(9)].map((_, dotIndex) => (
      <div key={`dot_${dotIndex}`} hidden={hideMiddle && dotIndex === 4} />
    ))}
  </div>
)

export default Window
