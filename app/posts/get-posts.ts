import { normalizePages } from 'nextra/normalize-pages'
import { getPageMap } from 'nextra/page-map'
import type { BlogMetadata } from 'nextra-theme-blog'

export type Post = {
  route: string
  frontMatter: BlogMetadata
  title: string
}

export async function getPosts(): Promise<Post[]> {
  const { directories } = normalizePages({
    list: await getPageMap('/posts'),
    route: '/posts'
  })

  return directories
    .filter(post => post.route !== '/posts')
    .map(post => ({
      route: post.route,
      frontMatter: post.frontMatter as BlogMetadata,
      title: String(post.title)
    }))
    .sort(
      (a, b) =>
        new Date(b.frontMatter.date ?? 0).getTime() -
        new Date(a.frontMatter.date ?? 0).getTime()
    )
}
