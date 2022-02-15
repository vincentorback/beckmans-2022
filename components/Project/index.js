import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import Link from 'next-translate-routes/link'
import Entry from '../Entry'
import Map from '../Map'
import Image from '../Image'
import Pagination from '../Pagination'
import Video from '../Video'
import styles from './project.module.css'

const Project = ({ project, projects, nextProject, prevProject }) => {
  const router = useRouter()
  const { category, name, title, image, links, thanks } = project

  const t = useTranslations()

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
    <article className={styles.project}>
      <div className={styles.inner}>
        {image && (
          <div className={styles.mainImage}>
            <Image
              src={image}
              alt={title}
              layout="responsive"
              width={803}
              height={928}
            />
            <div className={styles.dots}>
              {[...Array(9)].map((_, i) => (
                <div
                  style={{
                    '--row': Math.floor(i / 3),
                    '--cell': i % 3,
                  }}
                  key={`dot_${i}`}
                />
              ))}
            </div>
          </div>
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
              <ExampleParagraph />
              <ExampleLists />
              <ExampleParagraph />
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
                      <Link href={link.url}>
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
                      {thank.url ? (
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
                  alt={image?.alt}
                  layout="responsive"
                  width={447}
                  height={560}
                />
                <Image
                  src={image + '2'}
                  alt={image?.alt}
                  layout="responsive"
                  width={447}
                  height={560}
                />
              </div>
            )}
            <Video key={project.uid} provider="Vimeo" id="286740784" />
            {image && (
              <div className={styles.mediaGrid}>
                <Image
                  src={image + '3'}
                  alt={image?.alt}
                  layout="responsive"
                  width={447}
                  height={560}
                />
                <Image
                  src={image + '4'}
                  alt={image?.alt}
                  layout="responsive"
                  width={447}
                  height={560}
                />
              </div>
            )}
            <Image
              src={image + '5'}
              alt={image?.alt}
              layout="responsive"
              width={917}
              height={558}
            />
          </div>
        </div>
        <Pagination next={nextProject} prev={prevProject} />
      </div>
      <div className={styles.map}>
        <Map items={projects} category={project.category} />
      </div>
    </article>
  )
}

export default Project
