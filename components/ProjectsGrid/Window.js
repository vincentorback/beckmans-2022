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
              backgroundColor: previousItem.data.background_color
                ? `var(--color-${previousItem.data.background_color.toLowerCase()})`
                : null,
            }}
          >
            <div className="ProjectsGrid-windowContent">
              <p>
                {Boolean(
                  previousItem?.data?.name || previousItem?.data?.title
                ) && (
                  <PrismicText
                    field={
                      previousItem?.data?.name ?? previousItem?.data?.title
                    }
                  />
                )}
              </p>
              {previousItem?.data?.category && (
                <p>{t(slugify(previousItem.data.category))}</p>
              )}
              {item?.data?.title && <p />}
            </div>
            {previousItem?.data?.main_image?.url && (
              <Image
                alt=""
                className="ProjectsGrid-windowItemImage"
                width={(1440 / 12) * 6}
                height={(1440 / 12) * 6 * 1.1671511628}
                layout="responsive"
                quality={50}
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
              backgroundColor: item.data.background_color
                ? `var(--color-${item.data.background_color.toLowerCase()})`
                : null,
            }}
            variants={{
              loading: {
                opacity: 0,
                scale: 0.98,
              },
              complete: {
                transition: { duration: 0.1 },
                opacity: 1,
                scale: 1,
              },
            }}
          >
            <div className="ProjectsGrid-windowContent">
              <p>
                {Boolean(item?.data?.name || item?.data?.title) && (
                  <PrismicText field={item?.data?.name ?? item?.data?.title} />
                )}
              </p>
              {item?.data?.category && <p>{t(slugify(item.data.category))}</p>}
              {item?.data?.title && <p />}
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
                quality={50}
                onLoadingComplete={() => {
                  setIsLoaded(true)
                }}
              />
            )}
          </m.div>
        </LinkWrap>
      </div>
      <WindowDots />
    </m.div>
  )
}

const WindowDots = () => (
  <div className="ProjectsGrid-windowDots">
    {[...Array(9)].map((_, dotIndex) => (
      <div key={`dot_${dotIndex}`} />
    ))}
  </div>
)

export default Window
