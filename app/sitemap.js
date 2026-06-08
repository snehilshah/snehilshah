import { getAllPosts } from '@/lib/blog'
import { siteUrl } from '@/constants/defaultMetadata'

export default function sitemap() {
  const posts = getAllPosts()

  const postEntries = posts.map(p => ({
    url: `${siteUrl}/blogs/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: 'monthly',
    priority: 0.7
  }))

  const latest = posts[0] ? new Date(posts[0].frontmatter.date) : new Date()

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: latest,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    ...postEntries
  ]
}
