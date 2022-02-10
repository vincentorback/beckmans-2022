import classNames from 'classnames'
import Container from '../Container'
import styles from './menu.module.css'

const Menu = ({ isActive, toggleMenu, pages }) => {
  return (
    <div
      className={classNames(styles.menu, {
        [styles['is-active']]: isActive,
      })}
    >
      <div className={styles.inner}>
        <Container>
          <ul>
            {pages.map((page) => (
              <li key={page.uid}>
                <a href={`/${page.uid}`}>{page.data.title[0].text}</a>
              </li>
            ))}
          </ul>
          <button onClick={toggleMenu} className={styles.closeButton}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                y="4"
                width="4"
                height="4"
                transform="rotate(-90 0 4)"
                fill="currentColor"
              />
              <rect
                y="12.0001"
                width="4"
                height="4"
                transform="rotate(-90 0 12.0001)"
                fill="currentColor"
              />
              <rect
                y="20"
                width="4"
                height="4"
                transform="rotate(-90 0 20)"
                fill="currentColor"
              />
              <rect
                x="8"
                y="4"
                width="4"
                height="4"
                transform="rotate(-90 8 4)"
                fill="currentColor"
              />
              <rect
                x="8"
                y="12.0001"
                width="4"
                height="4"
                transform="rotate(-90 8 12.0001)"
                fill="currentColor"
              />
              <rect
                x="8"
                y="20"
                width="4"
                height="4"
                transform="rotate(-90 8 20)"
                fill="currentColor"
              />
              <rect
                x="16"
                y="4"
                width="4"
                height="4"
                transform="rotate(-90 16 4)"
                fill="currentColor"
              />
              <rect
                x="16"
                y="12.0001"
                width="4"
                height="4"
                transform="rotate(-90 16 12.0001)"
                fill="currentColor"
              />
              <rect
                x="16"
                y="20"
                width="4"
                height="4"
                transform="rotate(-90 16 20)"
                fill="currentColor"
              />
            </svg>
          </button>
        </Container>
      </div>
    </div>
  )
}

export default Menu
