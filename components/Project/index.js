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
import Video from '../Video'
import { m } from 'framer-motion'
import { slugify } from '../../lib/utilities'
import ProjectMedia from './Media'

const Project = ({ project, projects, nextProject, prevProject }) => {
  const router = useRouter()
  const t = useTranslations()

  const ExampleThanks = () => (
    <p className="u-preLine">
      {router.locale === 'en'
        ? `Grandma 'n Granpa \nMy teachers \nThe print house \nThe community \nThe future \nAhlgrens Bilar \nBe here nowness \nGodrick the Grafted \nAlbert Einstein \nAdam \nEva`
        : `Mormor & Morfar \nMina lärare \nTryckeriet`}
    </p>
  )

  const ExampleContent = () =>
    router.locale === 'sv' ? (
      <>
        <p>
          Mitt <strong>examensarbete</strong> är ett <em>självutforskande</em>{' '}
          av identitet ur ett posthumanistiskt perspektiv.{' '}
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
          perspective. <a href="#/">This has resulted</a> in three
          self-portraits in which I give expression to my multifaceted identity
          in the form of an avatar.
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

  return (
    <article className="Project">
      <m.div
        className="Project-inner"
        initial="initial"
        animate="animate"
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
              delay: 1,
              duration: 0.3,
            },
          },
          exit: {
            opacity: 0,
            y: 10,
            transition: {
              duration: 0.5,
            },
          },
        }}
      >
        <div className="Project-image">
          <Image
            src={project.data.main_image}
            alt=""
            layout="responsive"
            width={(1440 / 12) * 7}
            height={(1440 / 12) * 7 * 1.1671511628}
            sizes="(min-width: 1400px) 800px, (min-width: 800px) 50vw, 100vw"
          />
          <div className="Project-imageDots">
            {[...Array(9)].map((_, i) => (
              <div key={`dot_${i}`} />
            ))}
          </div>
        </div>
        <div className="Project-content">
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
                <ExampleContent />
              )}
            </Entry>
          </div>

          <div className="Project-projectInfo Project-projectInfo--thanks">
            <div className="Project-info">
              <h4>{t('project.thanks-to')}</h4>
              {project.data.thanks.length ? (
                <PrismicRichText field={project.data.thanks} />
              ) : (
                <ExampleThanks />
              )}
            </div>
          </div>

          {project.data.body.length ? (
            <ProjectMedia items={project.data.body} />
          ) : (
            <div className="Project-media">
              <div className="Project-mediaGrid">
                <Image
                  src={project.data.main_image}
                  alt=""
                  width={506}
                  height={634}
                />
                <Image
                  src={project.data.main_image}
                  alt=""
                  width={506}
                  height={634}
                />
              </div>
              <Video
                key={project.uid}
                provider_name="Vimeo"
                video_id="286740784"
                width={318}
                height={240}
                html={`<iframe src="https://player.vimeo.com/video/286740784?h=944a23271c&amp;app_id=122963" width="318" height="240" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="RED LIGHT"></iframe>`}
              />
              <Image
                src={project.data.main_image}
                alt=""
                width={1038}
                height={632}
              />
              <Image
                src={project.data.main_image}
                alt=""
                width={1038}
                height={1200}
              />
            </div>
          )}

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
        </div>
        <Pagination next={nextProject} prev={prevProject} />
      </m.div>
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
              },
              animate: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.6,
                  duration: 0.3,
                },
              },
              exit: {
                opacity: 0,
                y: 10,
                transition: {
                  duration: 0.5,
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

export default Project
