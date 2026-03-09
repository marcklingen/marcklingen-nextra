import type { Metadata } from 'next'
import { PostCard } from 'nextra-theme-blog'
import { getPosts } from './get-posts'

const pageTitle = 'Posts'

export const metadata: Metadata = {
  title: pageTitle
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <>
      <h1>{pageTitle}</h1>
      {posts.map(post => (
        <PostCard key={post.route} post={post} readMore="More →" />
      ))}
    </>
  )
}
