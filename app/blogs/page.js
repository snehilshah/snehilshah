import BlogTopbar from '@/components/Blog/BlogTopbar'
import BlogIndex from '@/components/Blog/BlogIndex'
import { getAllPosts } from '@/lib/blog'
import './blog-rework.css'

export const metadata = {
  title: 'Blog',
  description:
    'Writing on browsers, dev tooling, customization, and a calmer desktop.',
  alternates: {
    canonical: '/blogs',
    types: { 'application/rss+xml': '/rss.xml' }
  },
  openGraph: {
    title: 'Blog | Snehil Shah',
    description:
      'Writing on browsers, dev tooling, customization, and a calmer desktop.',
    url: '/blogs',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Snehil Shah',
    description:
      'Writing on browsers, dev tooling, customization, and a calmer desktop.'
  }
}

export default function Blogs() {
  const posts = getAllPosts()
  return (
    <main className='paper'>
      <BlogTopbar />
      <BlogIndex posts={posts} />
    </main>
  )
}
