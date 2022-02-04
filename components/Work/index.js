import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from '../../components/Image'
import Video from '../../components/Video'
import styles from './work.module.css'
import classNames from 'classnames'

const Work = ({ project }) => {
  const router = useRouter()
  const { category, name, title, image, links, video, thanks } = project

  const t = useTranslations('categories')

  return (
    <div className={styles.work}>
      <div className={styles.inner}>
        {image && (
          <Image
            src={image + '1'}
            alt=""
            layout="responsive"
            width={447}
            height={560}
          />
        )}
        <div className={classNames(styles.grid, styles.textBlock)}>
          <div>
            {name && (
              <h1 className={styles.title}>
                {name} <br />
                {title[router.locale]}
              </h1>
            )}
            <div className={styles.text}>
              <p>
                Mitt <strong>examensarbete</strong> är ett
                <em>självutforskande</em> av identitet ur ett posthumanistiskt
                perspektiv. <a href="#/">Resultatet</a> är tre självporträtt där
                jag gestaltar min mångfacetterade identitet i form av en avatar.
              </p>
              <h2>Rubrik 2</h2>
              <p>
                Mitt examensarbete är ett självutforskande av identitet ur ett
                posthumanistiskt perspektiv. Resultatet är tre självporträtt där
                jag gestaltar min mångfacetterade identitet i form av en avatar.
              </p>
              <h3>Rubrik 3</h3>
              <p>
                Mitt examensarbete är ett självutforskande av identitet ur ett
                posthumanistiskt perspektiv. Resultatet är tre självporträtt där
                jag gestaltar min mångfacetterade identitet i form av en avatar.
              </p>
              <ul>
                <li>Lista med saker</li>
                <li>Kan vara vadsom</li>
                <li>helst?</li>
              </ul>
              <h4>Rubrik 4</h4>
              <p>
                Mitt examensarbete är ett självutforskande av identitet ur ett
                posthumanistiskt perspektiv. Resultatet är tre självporträtt där
                jag gestaltar min mångfacetterade identitet i form av en avatar.
              </p>
              <ol>
                <li>Lista med saker</li>
                <li>Kan vara vadsom</li>
                <li>helst?</li>
              </ol>
              <p>
                Mitt examensarbete är ett självutforskande av identitet ur ett
                posthumanistiskt perspektiv. Resultatet är tre självporträtt där
                jag gestaltar min mångfacetterade identitet i form av en avatar.
              </p>
            </div>
            {category && <h2 className={styles.subtitle}>{t(category)}</h2>}
          </div>
          <div>
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
          </div>
        </div>

        {image && (
          <div className={styles.grid}>
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
        {video && <Video id="168013411" provider="vimeo" poster={image} />}
        <Image
          src={image + '2'}
          alt=""
          layout="responsive"
          width={558}
          height={917}
        />
        {video && <Video id="RecY5iZn6B0" provider="youtube" poster={image} />}
      </div>
      <div className={styles.map}>
        <div>
          <div>
            <p>karta</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Work
