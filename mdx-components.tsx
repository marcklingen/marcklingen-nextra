import type { MDXComponents } from 'nextra/mdx-components'
import { useMDXComponents as getBlogMDXComponents } from 'nextra-theme-blog'
import type { BlogMetadata } from 'nextra-theme-blog'

const blogComponents = getBlogMDXComponents()

const wrapper: NonNullable<MDXComponents['wrapper']> = ({
  children,
  metadata
}) => {
  const pageMetadata = metadata as typeof metadata & BlogMetadata
  const date = pageMetadata.date ? new Date(pageMetadata.date) : null

  return (
    <>
      <h1>{pageMetadata.title}</h1>
      {pageMetadata.author || date ? (
        <div className="page-meta">
          {pageMetadata.author ? <span>{pageMetadata.author}</span> : null}
          {pageMetadata.author && date ? <span>, </span> : null}
          {date ? (
            <time dateTime={date.toISOString()}>{date.toDateString()}</time>
          ) : null}
        </div>
      ) : null}
      {children}
    </>
  )
}

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    ...blogComponents,
    wrapper,
    ...components
  }
}
