import type { NextConfig } from 'next'
import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
  readingTime: true
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  cleanDistDir: true,
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
}

export default withNextra(nextConfig)

const nonPermanentRedirects = [
  ['/gh', 'https://github.com/marcklingen'],
  ['/x', 'https://x.com/marcklingen'],
  ['/cal', 'https://cal.com/marc-kl']
]

const permanentRedirects = []
