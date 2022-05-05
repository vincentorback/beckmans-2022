import { getEverything } from '../lib/content'
import { useTranslations } from 'next-intl'
import Container from '../components/Container'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Text from '../slices/Text'

export default function ErrorPage(props) {
  const { statusCode, statusMessage } = props
  const t = useTranslations('error')

  return (
    <Layout title={t('title')} {...props}>
      <Header {...props} />
      <Container>
        <div className="Layout-content">
          <Text title={t('title')}>
            <p>
              {statusCode} {statusMessage}
            </p>
          </Text>
        </div>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps({ res, locale }) {
  const content = await getEverything(locale)
  const messages = require(`../locales/${locale || 'sv'}.json`)

  return {
    props: {
      statusCode: res?.statusCode ?? 500,
      statusMessage: res?.statusMessage ?? messages?.error?.title,
      pages: content.pages,
      settings: content.settings,
      messages,
    },
  }
}
