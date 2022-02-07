import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from '../Image'
import Video from '../Video'
import Pagination from '../Pagination'
import Entry from '../Entry'
import styles from './project.module.css'
import classNames from 'classnames'

const Project = ({ project, nextProject, prevProject }) => {
  const router = useRouter()
  const { category, name, title, image, links, video, thanks } = project

  const t = useTranslations('categories')

  return (
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
          <div className={styles.mainText}>
            <header className={styles.header}>
              {name && (
                <h1 className={styles.title}>
                  {name} <br />
                  {title[router.locale]}
                </h1>
              )}
            </header>
            <div className={styles.text}>
              <Entry />
            </div>
          </div>

          <div className={styles.projectInfo}>
            <div className={styles.info}>
              <h4>Progam</h4>
              <p>{t(category)}</p>
            </div>
            <div className={styles.info}>
              <h4>Kontakt</h4>
              {links && (
                <ul>
                  {links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href} prefetch={false}>
                        <a>{link.label}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {thanks && (
              <div className={styles.info}>
                <h4>Tack till</h4>
                <ul>
                  {thanks.map((thank, thankIndex) => (
                    <li key={thankIndex}>
                      {thank.href ? (
                        <Link href={'#/'} prefetch={false}>
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
              <h4>Pressbilder</h4>
              <ul>
                <li>
                  <Link href={'#/'} prefetch={false}>
                    <a>Ladda ner</a>
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
                  src={image}
                  alt=""
                  layout="responsive"
                  width={447}
                  height={560}
                />
              </div>
            )}
            <Video id="168013411" provider="vimeo" />
            {/* <Video id="RecY5iZn6B0" provider="youtube" /> */}
            {/* <Image
              src="https://source.unsplash.com/random/558x917?1"
              alt=""
              layout="responsive"
              width={917}
              height={558}
            />
            <Image
              src="https://source.unsplash.com/random/917x1149?2"
              alt=""
              layout="responsive"
              width={803}
              height={928}
            /> */}
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
  )
}

export default Project
