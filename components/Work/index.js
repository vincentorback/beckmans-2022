import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from '../../components/Image'
import Video from '../../components/Video'
import styles from './work.module.css'

const Work = ({ project }) => {
  const router = useRouter()
  const { category, name, title, body, image, links, video } = project

  const t = useTranslations('categories')

  return (
    <div className={styles.work}>
      <div />
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
        <div className={styles.grid}>
          <div className={styles.text}>
            {name && <h1>{name}</h1>}
            {category && <p>{t(category)}</p>}
            {title && <p>{title[router.locale]}</p>}
            {body && (
              <p>
                Mitt examensarbete är ett självutforskande av identitet ur ett
                posthumanistiskt perspektiv. Resultatet är tre självporträtt där
                jag gestaltar min mångfacetterade identitet i form av en avatar.
              </p>
            )}
          </div>
          <div className={styles.text}>
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
            <div className={styles.info}>
              <h4>Tack till</h4>
              <ul>
                <li>
                  <Link href={'#/'} prefetch={false}>
                    <a>Förnamn efternamn</a>
                  </Link>
                </li>
                <li>Förnamn efternamn</li>
              </ul>
            </div>
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
        {video && <Video id="RecY5iZn6B0" provider="youtube" poster={image} />}
      </div>
    </div>
  )
}

export default Work
