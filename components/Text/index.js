import Container from '../Container'
import Entry from '../Entry'
import styles from './text.module.css'

const Text = () => {
  return (
    <div className={styles.text}>
      <Container size="lg">
        <div className={styles.grid}>
          <div className={styles.left}>
            <h1>Om utställningen</h1>
          </div>
          <div className={styles.right}>
            <Entry>
              <p>
                Vid Beckmans Designhögskola vet vi att design kan vara nyckeln
                till lösningen på olika problem. Från hur vi förvarar,
                konsumerar, klär oss och umgås till hur vi kommunicerar. Alltid
                utifrån ett hållbart perspektiv såklart, både vad gäller det
                sociala och det materiella. Att värna våra gemensamma resurser
                är A och O.
              </p>

              <p>
                Att studera vid Beckmans Designhögskola är att hela tiden
                befinna sig i verkligheten. Samarbeten sker kontinuerligt med
                bransch och industri, från små lokala till stora internationella
                aktörer. Studentarbeten möter offentligheten på mässor och
                modevisningar, i utställningar och föreställningar samt i en
                mängd andra format. Både inom och utanför Sverige.
              </p>

              <p>
                Form, Mode och Visuell kommunikation är våra tre
                utbildningsprogram. Under utbildningen experimenteras det,
                överdrivs, testas, förkastas, prickas in och nya nivåer nås. För
                att kunna göra rätt måste man få göra fel. Teori varvas med
                handens praktik. Kroki äger rum samtidigt som 3D-printern
                metodiskt arbetar i en verkstad bredvid. Klassiska
                hantverksmetoder kombineras med digital innovation.
              </p>

              <p>
                Covid-19 innebär en utmaning för hela samhället. Vid Beckmans
                viktade vi snabbt om till distansundervisning. Kreativitet, en
                lösningsinriktad hållning och solidaritet med varandra och
                samhället fick allt att löpa smidigt. Och för mig som rektor
                blev det tydligt att just dessa tre bitar är hörnpelare i
                Beckmans: kreativiteten, förmågan att lösa problem och
                solidariteten.
              </p>

              <p>
                Piece by piece har studenterna under sin utbildning skapat sig
                en verktygslåda av metoder, erfarenheter och tillvägagångssätt.
                Varmt välkommen att ta del av kreativiteten hos framtidens
                visuella kommunikatörer, formgivare och modedesigner!
              </p>

              <p>Rektor Beckmans Designhögskola</p>
              <p>Karina Ericsson Wärn</p>
            </Entry>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Text
