import BlogTopbar from '@/components/Blog/BlogTopbar'
import BlogIndex from '@/components/Blog/BlogIndex'
import { getAllPosts } from '@/lib/blog'
import './blog-rework.css'

export default function Blogs() {
  const posts = getAllPosts()
  return (
    <main className='paper'>
      <BlogTopbar />
      <BlogIndex posts={posts} />
    </main>
  )
}
