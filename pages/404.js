import { queryDocuments } from '../lib/content'
import { localeStrings } from '../lib/constants'
import Container from '../components/Container'
import Credits from '../components/Credits'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Slices from '../components/Slices'
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

export async function getStaticProps({ params, locale }) {
  const content = await queryDocuments()
  const pages = content.filter((item) => item.type === 'page')
  const messages = require(`../locales/${locale}.json`)

  return {
    props: {
      pages,
      messages,
    },
  }
}
