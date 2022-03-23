import Link from 'next-translate-routes/link'

const LinkWrap = ({ url, children, prefetch }) => {
  if (url) {
    return (
      <Link href={url} prefetch={prefetch || false} scroll={false}>
        <a>{children}</a>
      </Link>
    )
  }

  return children
}

export default LinkWrap
