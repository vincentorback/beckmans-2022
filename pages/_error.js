import { queryDocuments } from '../lib/content'
import Container from '../components/Container'
import Header from '../components/Header'
import Layout from '../components/Layout'
import Text from '../components/Text'
import { useTranslations } from 'next-intl'

export default function ErrorPage(props) {
  const { statusCode, statusMessage } = props
  const t = useTranslations('error')

  return (
    <Layout title={t('title')} {...props}>
      <Header {...props} />
      <Container>
        <div className="MainContent">
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
  const content = await queryDocuments()
  const pages = content.filter((item) => item.type === 'page')
  const messages = require(`../locales/${locale || 'sv'}.json`)

  return {
    props: {
      statusCode: res?.statusCode ?? 500,
      statusMessage: res?.statusMessage ?? 'Something went wrong',
      pages,
      messages,
    },
  }
}
