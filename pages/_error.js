export default function ErrorPage({ statusCode, statusMessage }) {
  return (
    <>
      <p>{statusCode} Something went wrong</p>
      <p>{statusMessage}</p>
    </>
  )
}

export async function getServerSideProps(props) {
  return {
    props: {
      statusCode: props?.res?.statusCode ?? 500,
      statusMessage: props.res.statusMessage ?? 'Something went wrong',
    },
  }
}
