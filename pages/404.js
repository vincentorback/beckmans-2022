import { getEverything } from '../lib/content'
import Container from '../components/Container'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Text from '../components/Text'
import { useTranslations } from 'next-intl'

export default function Error404Page(props) {
  const t = useTranslations('error')

  const pageTitle = '404'

  return (
    <Layout title={pageTitle} {...props}>
      <Header {...props} />
      <Container>
        <div className="Layout-content">
          <Text title={pageTitle}>
            <p>{t('404')}</p>
          </Text>
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  const content = await getEverything(locale)
  const messages = require(`../locales/${locale}.json`)

  return {
    props: {
      pages: content.pages,
      settings: content.settings,
      messages,
    },
  }
}
