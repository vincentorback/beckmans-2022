import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import Link from 'next-translate-routes/link'
import Container from '../Container'
import Entry from '../Entry'
import Image from '../Image'
import Pagination from '../Pagination'
import Video from '../Video'
import styles from './project.module.css'

const Project = ({ project, nextProject, prevProject }) => {
  const router = useRouter()
  const { category, name, title, image, links, video, thanks } = project

  const t = useTranslations()

  return (
    <Container>
      <article className={styles.project}>
        <div className={styles.inner}>
          {image && (
            <Image
              className={styles.mainImage}
              src={image}
              alt=""
              layout="responsive"
              width={803}
              height={928}
            />
          )}
          <div className={styles.content}>
            <header className={styles.header}>
              {name && (
                <h1 className={styles.title}>
                  {name} <br />
                  {title[router.locale]}
                </h1>
              )}
            </header>

            <div className={styles.mainText}>
              <Entry>
                <p>
                  Mitt <strong>examensarbete</strong> är ett
                  <em>självutforskande</em> av identitet ur ett posthumanistiskt
                  perspektiv. <a href="#/">Resultatet</a> är tre självporträtt
                  där jag gestaltar min mångfacetterade identitet i form av en
                  avatar.
                </p>
                <h2>Rubrik 2</h2>
                <p>
                  Mitt examensarbete är ett självutforskande av identitet ur ett
                  posthumanistiskt perspektiv. Resultatet är tre självporträtt
                  där jag gestaltar min mångfacetterade identitet i form av en
                  avatar.
                </p>
                <h3>Rubrik 3</h3>
                <p>
                  Mitt examensarbete är ett självutforskande av identitet ur ett
                  posthumanistiskt perspektiv. Resultatet är tre självporträtt
                  där jag gestaltar min mångfacetterade identitet i form av en
                  avatar.
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
                <h4>Rubrik 4</h4>
                <p>
                  Mitt examensarbete är ett självutforskande av identitet ur ett
                  posthumanistiskt perspektiv. Resultatet är tre självporträtt
                  där jag gestaltar min mångfacetterade identitet i form av en
                  avatar.
                </p>
              </Entry>
            </div>

            <div className={styles.projectInfo}>
              <div className={styles.info}>
                <h4>Program</h4>
                <p>{t(`categories.${category}`)}</p>
              </div>
              <div className={styles.info}>
                <h4>{t('project.contact')}</h4>
                {links && (
                  <ul>
                    {links.map((link, linkIndex) => (
                      <li key={link.label}>
                        <Link href={link.href}>
                          <a>{link.label}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {thanks && (
                <div className={styles.info}>
                  <h4>{t('project.thanks-to')}</h4>
                  <ul>
                    {thanks.map((thank, thankIndex) => (
                      <li key={thank.label}>
                        {thank.href ? (
                          <Link href={'#/'}>
                            <a>{thank.label}</a>
                          </Link>
                        ) : (
                          thank.label
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className={styles.info}>
                <h4>{t('project.press-images')}</h4>
                <ul>
                  <li>
                    <Link href={'#/'}>
                      <a>{t('project.download')}</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.media}>
              {image && (
                <div className={styles.mediaGrid}>
                  <Image
                    src={image + '1'}
                    alt=""
                    layout="responsive"
                    width={447}
                    height={560}
                  />
                  <Image
                    src={image + '2'}
                    alt=""
                    layout="responsive"
                    width={447}
                    height={560}
                  />
                </div>
              )}
              <Video id="168013411" provider="vimeo" />
              {image && (
                <div className={styles.mediaGrid}>
                  <Image
                    src={image + '3'}
                    alt=""
                    layout="responsive"
                    width={447}
                    height={560}
                  />
                  <Image
                    src={image + '4'}
                    alt=""
                    layout="responsive"
                    width={447}
                    height={560}
                  />
                </div>
              )}
              <Image
                src={image + '5'}
                alt=""
                layout="responsive"
                width={917}
                height={558}
              />
            </div>
          </div>
          <Pagination next={nextProject} prev={prevProject} />
        </div>
        <div className={styles.map}>
          <div>
            <div>
              <p>karta</p>
            </div>
          </div>
        </div>
      </article>
    </Container>
  )
}

export default Project
