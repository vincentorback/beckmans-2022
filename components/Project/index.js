import React from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import Link from 'next-translate-routes/link'
import Entry from '../Entry'
import Map from '../Map'
import Image from '../Image'
import Pagination from '../Pagination'
import Video from '../Video'
import { m } from 'framer-motion'

const Project = ({ project, projects, nextProject, prevProject }) => {
  const router = useRouter()
  const { category, name, title, image, links } = project

  const setPush = React.useCallback(
    (push) =>
      window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--sticky-push', `${push}px`)
      }),
    []
  )

  React.useEffect(() => {
    const handleScroll = () => {
      // if (headerRef.current) {
      //   if (
      //     window.scrollY +
      //       document.documentElement.clientHeight +
      //       headerRef.current.clientHeight >
      //     document.documentElement.scrollHeight
      //   ) {
      //     setHeadPush(
      //       Math.min(
      //         Math.abs(
      //           document.documentElement.scrollHeight -
      //             (window.scrollY +
      //               document.documentElement.clientHeight +
      //               headerRef.current.clientHeight)
      //         ),
      //         headerRef.current.clientHeight
      //       )
      //     )
      //   } else {
      //     setHeadPush(0)
      //   }
      // }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [setPush])

  const t = useTranslations()

  const thanks =
    router.locale === 'en'
      ? `Grandma 'n Granpa \nMy teachers \nThe print house \nThe community \nThe future \nAhlgrens Bilar \nBe here nowness \nGodrick the Grafted \nAlbert Einstein \nAdam \nEva`
      : `Mormor & Morfar \nMina lärare \nTryckeriet`

  const ExampleParagraph = () =>
    router.locale === 'sv' ? (
      <p>
        Mitt <strong>examensarbete</strong> är ett <em>självutforskande</em> av
        identitet ur ett posthumanistiskt perspektiv.{' '}
        <a href="#/">Resultatet</a> är tre självporträtt där jag gestaltar min
        mångfacetterade identitet i form av en avatar.
      </p>
    ) : (
      <p>
        My <strong>graduation project</strong> is a{' '}
        <em>personal investigation</em> of identity from a post-humanist
        perspective. <a href="#/">This has resulted</a> in three self-portraits
        in which I give expression to my multifaceted identity in the form of an
        avatar.
      </p>
    )

  const ExampleLists = () =>
    router.locale === 'sv' ? (
      <>
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
            transition: {
              delay: 0,
              duration: 0.3,
            },
          },
          animate: {
            opacity: 1,
            y: 0,
            transition: {
              delay: 0,
              duration: 0.3,
            },
          },
          exit: {
            opacity: 0,
            y: -10,
            transition: {
              delay: 0,
              duration: 0.3,
            },
          },
        }}
      >
        {image && (
          <div className="Project-image">
            <Image
              src={image}
              alt={title[router.locale]}
              layout="responsive"
              width={(1440 / 12) * 7 * 2}
              height={(1440 / 12) * 7 * 2 * 1.1671511628}
              // width={1038}
              // height={1200}
              sizes="(min-width: 1400px) 800px, (min-width: 800px) 50vw, 100vw"
            />
            <div className="Project-imageDots">
              {[...Array(9)].map((_, i) => (
                <div key={`dot_${i}`} />
              ))}
            </div>
          </div>
        )}
        <div className="Project-content">
          <header className={classNames('Project-header', 'u-showSmall')}>
            {name && <h1 className="Project-title">{name}</h1>}
            {title && (
              <h2 className="Project-subtitle">{title[router.locale]}</h2>
            )}
          </header>

          <div className="Project-mainText">
            <Entry>
              <ExampleParagraph />
              <ExampleLists />
              <ExampleParagraph />
            </Entry>
          </div>

          <div className="Project-projectInfo">
            <div className={classNames('Project-info', 'u-showSmall')}>
              <h4>Program</h4>
              <p>{t(`categories.${category}`)}</p>
            </div>
            <div className={classNames('Project-info', 'u-showSmall')}>
              <h4>{t('project.contact')}</h4>
              {links && (
                <ul>
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.url} prefetch={false}>
                        <a target="_blank">{link.label}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {thanks && (
              <div className="Project-info">
                <h4>{t('project.thanks-to')}</h4>
                <p className="u-preLine">{thanks}</p>
              </div>
            )}
            <div className={classNames('Project-info', 'u-showSmall')}>
              <h4>{t('project.press-images')}</h4>
              <ul>
                <li>
                  <Link href={'#/'} prefetch={false}>
                    <a>{t('project.download')}</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="Project-media">
            {image && (
              <div className="Project-mediaGrid">
                <Image
                  src={image}
                  alt={image?.alt}
                  layout="responsive"
                  width={506}
                  height={634}
                  // TODO: Sizes
                />
                <Image
                  src={image}
                  alt={image?.alt}
                  layout="responsive"
                  width={506}
                  height={634}
                  // TODO: Sizes
                />
              </div>
            )}
            <Video
              key={project.uid}
              provider="Vimeo"
              id="286740784"
              width={318}
              height={240}
              html={`<iframe src="https://player.vimeo.com/video/286740784?h=944a23271c&amp;app_id=122963" width="318" height="240" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="RED LIGHT"></iframe>`}
            />
            <Image
              src={image}
              alt={image?.alt}
              layout="responsive"
              width={1038}
              height={632}
              // TODO: Sizes
            />
            <Image
              src={image}
              alt={image?.alt}
              layout="responsive"
              width={1038}
              height={1200}
              // TODO: Sizes
            />
          </div>
        </div>
        <Pagination next={nextProject} prev={prevProject} />
      </m.div>
      <m.div
        className={classNames('Project-sidebar', 'u-hideSmall')}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: {
            opacity: 0,
            y: -10,
            transition: {
              delay: 0,
              duration: 0.4,
            },
          },
          animate: {
            opacity: 1,
            y: 0,
            transition: {
              delay: 0,
              duration: 0.4,
            },
          },
          exit: {
            opacity: 0,
            y: 10,
            transition: {
              delay: 0,
              duration: 0.4,
            },
          },
        }}
      >
        <div className="Project-sidebarInner">
          <div className="Project-sidebarUpper">
            <header className="Project-header">
              {name && <h1 className="Project-title">{name}</h1>}
              {title && (
                <h2 className="Project-subtitle">{title[router.locale]}</h2>
              )}
            </header>
            <div className="Project-projectInfo">
              <div className="Project-info">
                <h4>Program</h4>
                <p>{t(`categories.${category}`)}</p>
              </div>
              <div className="Project-info">
                <h4>{t('project.contact')}</h4>
                <ul>
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.url} prefetch={false}>
                        <a target="_blank">{link.label}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="Project-info">
                <h4>{t('project.press-images')}</h4>
                <ul>
                  <li>
                    <Link href={'#/'} prefetch={false}>
                      <a>{t('project.download')}</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="Project-sidebarLower">
            <Map items={projects} category={project.category} />
          </div>
        </div>
      </m.div>
    </article>
  )
}

export default Project
