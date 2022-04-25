import Link from 'next-translate-routes/link'

const LinkWrap = ({ className, href, children }) => {
  if (href) {
    return (
      <Link href={href} prefetch={false} scroll={false}>
        <a
          className={className}
          target={href.includes('http') ? '_blank' : null}
        >
          {children}
        </a>
      </Link>
    )
  }

  return children
}

export default LinkWrap
