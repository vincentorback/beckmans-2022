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

  return (
    <Layout {...props}>
      <Header />
      <Container>
        <Text title={`404 = ${t('title')}`}>
          <p>{t('404')}</p>
        </Text>
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
