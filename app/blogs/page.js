import BlogNav from '@/components/Blog/BlogNav'
import Link from 'next/link'
import BlogHero from '@/components/Blog/BlogHero'
import BlogBGGrid from '@/components/Blog/BlogBGGrid'
import Head from 'next/head'
import { getFrontMatter } from '@/lib/helpers'
import path from 'path'
import fs from 'fs'

async function blogs() {
  const posts = []
  for (const file of fs.readdirSync('posts')) {
    fs.readFileSync(path.join('posts', file), 'utf-8')
    const frontmatter = getFrontMatter(path.join('posts', file))
    posts.push({
      slug: file.replace('.mdx', ''),
      frontmatter
    })
  }

  posts.sort((a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  })

  return (
    <div className={'max-w-(--breakpoint-2xl) mx-auto'}>
      <BlogBGGrid />
      <BlogNav />
      <BlogHero />
      <div
        className={
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'
        }
      >
        {posts.map((post, index) => (
          <Link key={index} href={`/blogs/${post.slug}`}>
            <div className='rounded-lg group cursor-pointer overflow-hidden outline outline-stone-600 outline-1 shadow-lg'>
              <img
                src={post.frontmatter.cover_image}
                alt={'Post Cover Image'}
                className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
              />
              <div className='flex justify-between p-5 bg-stone-100'>
                <div className=''>
                  <p className='text-lg font-bold'>{post.frontmatter.title}</p>
                  <p className='text-sm'>{post.frontmatter.description}</p>
                </div>

                <p className='min-w-20 whitespace-nowrap'>
                  {post.frontmatter.date}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default blogs
