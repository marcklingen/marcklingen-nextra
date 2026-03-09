import { useMDXComponents as getBlogMDXComponents } from 'nextra-theme-blog'

const blogComponents = getBlogMDXComponents()

export function useMDXComponents(components) {
  return {
    ...blogComponents,
    wrapper({ children, metadata }) {
      const date = metadata.date ? new Date(metadata.date) : null

      return (
        <>
          <h1>{metadata.title}</h1>
          {metadata.author || date ? (
            <div className="page-meta">
              {metadata.author ? <span>{metadata.author}</span> : null}
              {metadata.author && date ? <span>, </span> : null}
              {date ? (
                <time dateTime={date.toISOString()}>{date.toDateString()}</time>
              ) : null}
            </div>
          ) : null}
          {children}
        </>
      )
    },
    ...components
  }
}
