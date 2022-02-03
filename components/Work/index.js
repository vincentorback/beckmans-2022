import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import Image from '../../components/Image'
import styles from './work.module.css'

const Work = ({ project }) => {
  const router = useRouter()
  const { category, name, title, image } = project

  const t = useTranslations('categories')

  return (
    <div className={styles.work}>
      {name && <h1>{name}</h1>}
      {category && <p>{t(category)}</p>}
      {title && <p>{title[router.locale]}</p>}
      {image && (
        <Image
          src={image}
          alt=""
          layout="responsive"
          width={500}
          height={500}
        />
      )}
    </div>
  )
}

export default Work
