import Head from 'next/head'

const Meta = ({ children }) => {
  return (
    <Head>
      <title>Beckmans examensutställning 2022</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      {children}
    </Head>
  )
}

export default Meta
