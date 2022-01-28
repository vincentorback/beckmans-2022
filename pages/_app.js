import Layout from '../components/Layout'
import '../styles/index.css'

const App = ({ Component, pageProps, router }) => {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} key={router.route} />
    </Layout>
  )
}

export default App
