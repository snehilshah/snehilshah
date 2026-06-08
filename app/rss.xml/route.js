import { getAllPosts } from '@/lib/blog'
import { siteUrl } from '@/constants/defaultMetadata'

// prerender to a static /rss.xml at build; new posts get picked up each build
export const dynamic = 'force-static'

const esc = s =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export function GET() {
  const posts = getAllPosts()
  const updated = posts[0] ? new Date(posts[0].frontmatter.date) : new Date()

  const items = posts
    .map(p => {
      const url = `${siteUrl}/blogs/${p.slug}`
      return `    <item>
      <title>${esc(p.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate>
      <category>${esc(p.frontmatter.topic)}</category>
      <description>${esc(p.frontmatter.description)}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Snehil Shah — Blog</title>
    <link>${siteUrl}/blogs</link>
    <description>Writing on browsers, dev tooling, customization, and a calmer desktop.</description>
    <language>en</language>
    <lastBuildDate>${updated.toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
  })
}
