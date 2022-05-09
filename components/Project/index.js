import React from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
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
  const router = useRouter()
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
      ) : (
        <ExampleMedia image={project.data.main_image} />
      ),
    [project.data.body, project.data.main_image]
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

          <div className="Project-mainText">
            <Entry>
              {project.data.text.length ? (
                <PrismicRichText field={project.data.text} />
              ) : (
                <ExampleContent locale={router.locale} />
              )}
            </Entry>
          </div>

          <div className="Project-projectInfo Project-projectInfo--thanks">
            <div className="Project-info">
              <h4>{t('project.thanks-to')}</h4>
              {project.data.thanks.length ? (
                <PrismicRichText field={project.data.thanks} />
              ) : (
                <ExampleThanks locale={router.locale} />
              )}
            </div>
          </div>

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
        width={Math.floor((1440 / 12) * 7)}
        height={Math.floor((1440 / 12) * 7 * 1.1671511628)}
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

const ExampleThanks = ({ locale }) => (
  <p className="u-preLine">
    {locale === 'en'
      ? `Grandma 'n Granpa \nMy teachers \nThe print house \nThe community \nThe future \nAhlgrens Bilar \nBe here nowness \nGodrick the Grafted \nAlbert Einstein \nAdam \nEva`
      : `Mormor & Morfar \nMina lärare \nTryckeriet`}
  </p>
)

const ExampleContent = ({ locale }) =>
  locale === 'sv' ? (
    <>
      <p>
        Mitt <strong>examensarbete</strong> är ett <em>självutforskande</em> av
        identitet ur ett posthumanistiskt perspektiv.{' '}
        <a href="#/">Resultatet</a> är tre självporträtt där jag gestaltar min
        mångfacetterade identitet i form av en avatar.
      </p>
      <ul>
        <li>Lista med saker</li>
        <li>Kan vara vadsom</li>
        <li>helst?</li>
      </ul>
      <ol>
        <li>Lista med saker</li>
        <li>Kan vara vadsom</li>
        <li>helst?</li>
      </ol>
    </>
  ) : (
    <>
      <p>
        My <strong>graduation project</strong> is a{' '}
        <em>personal investigation</em> of identity from a post-humanist
        perspective. <a href="#/">This has resulted</a> in three self-portraits
        in which I give expression to my multifaceted identity in the form of an
        avatar.
      </p>
      <ul>
        <li>List with things</li>
        <li>Can be</li>
        <li>anything?</li>
      </ul>
      <ol>
        <li>List with things</li>
        <li>Can be</li>
        <li>anything?</li>
      </ol>
    </>
  )

const ExampleMedia = ({ image }) => (
  <div className="Project-media">
    <div className="Project-mediaGrid">
      <Image
        src={image}
        alt=""
        width={506}
        height={634}
        quality={1}
        lazyBoundary="100%"
      />
      <Image
        src={image}
        alt=""
        width={506}
        height={634}
        quality={1}
        lazyBoundary="100%"
      />
    </div>
    <Image
      src={image}
      alt=""
      width={1038}
      height={632}
      quality={1}
      lazyBoundary="100%"
    />
    <Image
      src={image}
      alt=""
      width={1038}
      height={1200}
      quality={1}
      lazyBoundary="100%"
    />
  </div>
)
