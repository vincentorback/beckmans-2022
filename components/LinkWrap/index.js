import Link from 'next-translate-routes/link'

const LinkWrap = ({ className, url, children }) => {
  if (url) {
    return (
      <Link href={url} prefetch={false} scroll={false}>
        <a className={className}>{children}</a>
      </Link>
    )
  }

  return children
}

export default LinkWrap
