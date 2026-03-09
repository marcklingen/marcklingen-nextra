import { getPosts } from '../posts/get-posts'

const CONFIG = {
  title: 'Marc Klingen',
  siteUrl: 'https://marcklingen.com',
  description: 'Posts by Marc Klingen.',
  lang: 'en-us'
}

function escapeXml(value = ''): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export async function GET() {
  const posts = await getPosts()
  const items = posts
    .map(post => {
      const title = escapeXml(post.frontMatter.title || post.title)
      const description = escapeXml(post.frontMatter.description || '')
      const link = `${CONFIG.siteUrl}${post.route}`
      const pubDate = new Date(post.frontMatter.date ?? 0).toUTCString()

      return `    <item>
        <title>${title}</title>
        <description>${description}</description>
        <link>${link}</link>
        <guid>${link}</guid>
        <pubDate>${pubDate}</pubDate>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${CONFIG.title}</title>
    <link>${CONFIG.siteUrl}</link>
    <description>${CONFIG.description}</description>
    <language>${CONFIG.lang}</language>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  })
}
