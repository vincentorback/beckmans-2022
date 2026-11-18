import NextLink from 'next/link'
import Link from 'next-translate-routes/link'

const LinkWrap = ({ className, href, children, locale, lang }) => {
  if (href?.length) {
    if (href.includes('http')) {
      return (
        <NextLink href={href} prefetch={false} scroll={false}>
          <a
            className={className}
            target="_blank"
            rel="noopener noreferrer"
            lang={lang}
          >
            {children}
          </a>
        </NextLink>
      )
    }

    return (
      <Link href={href} locale={locale} prefetch={false} scroll={false}>
        <a
          className={className}
          target={href.includes('http') ? '_blank' : null}
          lang={lang}
        >
          {children}
        </a>
      </Link>
    )
  }

  return <span className={className}>{children}</span>
}

export default LinkWrap
