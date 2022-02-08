import Container from '../Container'
import { useTranslations } from 'next-intl'
import styles from './credits.module.css'

const Credits = ({ data }) => {
  const t = useTranslations()

  return (
    <div className={styles.credits}>
      <Container>
        <h1>{t('credits')}</h1>
        <div className={styles.columns}>
          {data.map((column, columnIndex) =>
            columnIndex % 3 ? (
              <div className={styles.column} key={columnIndex}>
                <h2>{column.title}</h2>
                <p className={styles.subtitle}>
                  <strong>Koncept & Art Direction</strong>
                </p>
                <p>
                  <a href="#/">Eric Rösmark</a>
                </p>
                <p>
                  <a href="#/">Jonna Lindberg</a>
                </p>
                <p>
                  <a href="#/">Maja Schein</a>
                </p>
                <p>
                  <a href="#/">Sara Solén</a>
                </p>

                <p className={styles.subtitle}>
                  <strong>Handledare</strong>
                </p>
                <p>
                  <a href="#/">Ida Wessel</a>
                </p>
                <p>
                  <a href="#/">Jonas Banker</a>
                </p>

                <p className={styles.subtitle}>
                  <strong>Utställningsproducent</strong>
                </p>
                <p>
                  <a href="#/">Anneè Olofsson</a>
                </p>

                <p className={styles.subtitle}>
                  <strong>Projektledare</strong>
                </p>
                <p>
                  <a href="#/">Malin Carle</a>
                </p>

                <p className={styles.subtitle}>
                  <strong>Pressansvarig</strong>
                </p>
                <p>
                  <a href="#/">Sofia Hulting</a>
                </p>

                <p className={styles.subtitle}>
                  <strong>Chef externa relationer</strong>
                </p>
                <p>
                  <a href="#/">Annika Berner</a>
                </p>

                <p className={styles.subtitle}>
                  <strong>Ansvarig Utgivare</strong>
                </p>
                <p>
                  <a href="#/">Karina Ericsson Wärn</a>
                </p>
              </div>
            ) : (
              <div className={styles.column} key={columnIndex}>
                <h2>{column.title}</h2>
                <p className={styles.subtitle}>
                  <strong>Form</strong>
                </p>

                <p className={styles.subtitle}>Kursansvarig Examensarbete</p>
                <p>
                  Margo Barolo <br />
                  Programansvarig
                </p>

                <p className={styles.subtitle}>Handledare processbeskrivning</p>
                <p>
                  Katarina Sjögren <br />
                  Lektor HTK
                </p>

                <p className={styles.subtitle}>Handledare examensarbete</p>
                <p>Fredrik Paulsen</p>
                <p>Gabriella Lenke</p>
                <p>Louise Bahrton</p>
                <p>Margot Barolo</p>
                <p>Peter Nylander</p>
              </div>
            )
          )}
        </div>
      </Container>
    </div>
  )
}

export default Credits
