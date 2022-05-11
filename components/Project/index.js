import React from 'react'
import { useTranslations } from 'next-intl'
import classNames from 'classnames'
import Link from 'next-translate-routes/link'
import Entry from '../Entry'
import Map from '../Map'
import Image from '../Image'
import Pagination from '../Pagination'
import { PrismicText, PrismicRichText } from '@prismicio/react'
import { m } from 'framer-motion'
import { slugify } from '../../lib/utilities'
import ProjectSlices from './ProjectSlices'
import { SESSION_ITEM } from '../../lib/constants'

const Project = ({ project, projects, nextProject, prevProject }) => {
  const t = useTranslations()

  React.useEffect(() => {
    sessionStorage[SESSION_ITEM] = project.uid
  }, [project.uid])

  const MemoImage = React.useMemo(
    () => <MainImage image={project.data.main_image} />,
    [project.data.main_image]
  )

  const MemoMedia = React.useMemo(
    () =>
      project.data.body.length ? (
        <ProjectSlices items={project.data.body} />
      ) : null,
    [project.data.body]
  )

  return (
    <article className="Project">
      <div className="Project-inner">
        {MemoImage}
        <m.div
          className="Project-content"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
              transition: {
                delay: 0.5,
                duration: 0.4,
              },
            },
            exit: {
              opacity: 0,
              transition: {
                duration: 0.4,
              },
            },
          }}
        >
          <header className={classNames('Project-header', 'u-showSmall')}>
            {Boolean(project.data.name.length) && (
              <h1 className="Project-title">
                <PrismicText field={project.data.name} />
              </h1>
            )}
            {Boolean(project.data?.project_title.length) && (
              <h2 className="Project-subtitle">
                <PrismicText field={project.data.project_title} />
              </h2>
            )}
          </header>

          {Boolean(project.data.text.length) && (
            <div className="Project-mainText">
              <Entry>
                <PrismicRichText field={project.data.text} />
              </Entry>
            </div>
          )}

          {Boolean(project.data.thanks.length) && (
            <div className="Project-projectInfo Project-projectInfo--thanks">
              <div className="Project-info">
                <h4>{t('project.thanks-to')}</h4>

                <PrismicRichText field={project.data.thanks} />
              </div>
            </div>
          )}

          {MemoMedia}

          <div className="Project-projectInfo Project-projectInfo--main">
            <div className={classNames('Project-info', 'u-showSmall')}>
              <h4>Program</h4>
              <p>{t(`categories.${slugify(project.data.category)}`)}</p>
            </div>

            {Boolean(project.data.contact.length) && (
              <div className={classNames('Project-info', 'u-showSmall')}>
                <h4>{t('project.contact')}</h4>
                <PrismicRichText field={project.data.contact} />
              </div>
            )}

            {project.data.press_download.url && (
              <div className={classNames('Project-info', 'u-showSmall')}>
                <h4>{t('project.press-images')}</h4>
                <ul>
                  <li>
                    <Link href={project.data.press_download.url}>
                      <a
                        download={project.data.press_download.name}
                        title={`${project.data.press_download.name} (${(
                          project.data.press_download.size / 1000000
                        ).toFixed(2)}MB)`}
                      >
                        {t('project.download')}
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </m.div>
        <Pagination next={nextProject} prev={prevProject} />
      </div>
      <div className={classNames('Project-sidebar', 'u-hideSmall')}>
        <div className="Project-sidebarInner">
          <m.div
            className="Project-sidebarUpper"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: {
                opacity: 0,
                y: -10,
              },
              animate: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.5,
                  duration: 0.4,
                },
              },
              exit: {
                opacity: 0,
                y: -10,
                transition: {
                  duration: 0.4,
                },
              },
            }}
          >
            <header className="Project-header">
              {Boolean(project.data.name.length) && (
                <h1 className="Project-title">
                  <PrismicText field={project.data.name} />
                </h1>
              )}
              {Boolean(project.data?.project_title.length) && (
                <h2 className="Project-subtitle">
                  <PrismicText field={project.data.project_title} />
                </h2>
              )}
            </header>
            <div className="Project-projectInfo Project-projectInfo--main">
              <div className="Project-info">
                <h4>Program</h4>
                <p>{t(`categories.${slugify(project.data.category)}`)}</p>
              </div>
              {Boolean(project.data.contact.length) && (
                <div className={classNames('Project-info', 'u-hideSmall')}>
                  <h4>{t('project.contact')}</h4>
                  <PrismicRichText field={project.data.contact} />
                </div>
              )}
              {project.data.press_download.url && (
                <div className="Project-info">
                  <h4>{t('project.press-images')}</h4>
                  <ul>
                    <li>
                      <Link href={project.data.press_download.url}>
                        <a
                          download={project.data.press_download.name}
                          title={`${project.data.press_download.name} (${(
                            project.data.press_download.size / 1000000
                          ).toFixed(2)}MB)`}
                        >
                          {t('project.download')}
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </m.div>

          <div className="Project-sidebarLower">
            <Map items={projects} category={project.data.category} />
          </div>
        </div>
      </div>
    </article>
  )
}

const MainImage = ({ image }) => {
  const [isImageLoaded, setImageLoaded] = React.useState(false)

  const handleImageLoad = React.useCallback(() => {
    setImageLoaded(true)
  }, [])

  const ImageLoader = React.useMemo(
    () => (
      <Image
        src={image}
        alt=""
        layout="responsive"
        width={image.dimensions.width}
        height={image.dimensions.height}
        sizes="(min-width: 1400px) 800px, (min-width: 800px) 50vw, 100vw"
        onLoadingComplete={handleImageLoad}
      />
    ),
    [image, handleImageLoad]
  )

  const ImageDots = React.useMemo(
    () => (
      <div className="Project-imageDots">
        {[...Array(9)].map((_, dotIndex) => (
          <m.div
            initial="initial"
            animate="animate"
            variants={{
              initial: {
                opacity: 1,
                scale: 1,
              },
              animate: {
                opacity: 0,
                scale: 0.8,
                transition: {
                  duration: 1,
                  delay: 1 + (dotIndex % 4) * 0.5,
                },
              },
            }}
            key={`dot_${dotIndex}`}
          />
        ))}
      </div>
    ),
    []
  )

  return (
    <m.div
      className="Project-image"
      initial="initial"
      animate={isImageLoaded && 'animate'}
      exit="exit"
      variants={{
        initial: {
          opacity: 0,
          y: 10,
        },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.3,
            delay: 0,
          },
        },
        exit: {
          opacity: 0,
          y: 10,
          transition: {
            duration: 0.3,
          },
        },
      }}
    >
      {ImageLoader}
      {ImageDots}
    </m.div>
  )
}

export default Project
