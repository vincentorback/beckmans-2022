import Image from '../../components/Image'
import Slices from '../../components/Slices'
import Link from 'next/link'
import styles from './work.module.css'

const Work = ({ project }) => {
  const { data } = project

  const links = data.links.filter(
    (item) => item.link_url.url && item.link_label[0]?.text
  )

  return (
    <div className={styles.work}>
      {data.full_name[0]?.text && <h1>{data.full_name[0].text}</h1>}
      <p>{data.category}</p>
      <p>{data.title[0].text}</p>
      {links.length ? (
        <div>
          <p>Länkar:</p>
          <ul>
            {links.map((item, index) => (
              <li key={index}>
                <Link href={item.link_url.url}>
                  <a>{item.link_label[0]?.text}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <Slices slices={data.body} doc={project} />
    </div>
  )
}

export default Work
