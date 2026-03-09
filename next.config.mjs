import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
  readingTime: true
})

export default withNextra({
  reactStrictMode: true,
  cleanDistDir: true,
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.jsx'
    }
  },
  redirects: async () => [
    ...nonPermanentRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: false
    })),
    ...permanentRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true
    }))
  ]
})

const nonPermanentRedirects = [
  ['/gh', 'https://github.com/marcklingen'],
  ['/x', 'https://x.com/marcklingen'],
  ['/cal', 'https://cal.com/marc-kl']
]

const permanentRedirects = []
