import Header from '@/components/Blog/Header'
import Logo from '../../public/logo-s.png'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

function blogs({ posts }) {
  console.log(posts)
  return (
    <div className={'max-w-screen-2xl mx-auto'}>
      <Header />
      <div
        className={
          'flex justify-between items-center bg-stone-400 border-y border-black py-10 lg:py-0'
        }
      >
        <div className={'px-10 space-y-5'}>
          <h1 className={'text-6xl max-w-xl font-serif'}>Read and Connect</h1>
          <h2>Stay Curious and Keep exploring</h2>
        </div>
        <Image
          src={Logo}
          className={'hidden md:inline-flex h-32 lg:h-full max-w-xs'}
          alt={'Snehil Logo'}
        />
      </div>
      {/*  Posts */}
      <div
        className={
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'
        }
      >
        {posts.map((post, index) => (
          <Link key={index} href={`/blogs/${post.slug}`}>
            <div className='border rounded-lg group cursor-pointer overflow-hidden'>
              <img
                src={post.frontmatter.cover_image}
                alt={'Post Cover Image'}
                className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
              />
              <div className='flex justify-between p-5 bg-white'>
                <div className=''>
                  <p className='text-lg font-bold'>{post.frontmatter.title}</p>
                  <p className='text-sm'>{post.frontmatter.description}</p>
                </div>

                <p>{post.frontmatter.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // get the files with from the directory posts
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map(filename => {
    // remove the .md file extension
    const slugs = filename.replace('.md', '')
    console.log(slugs)
    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug: slugs,
      frontmatter
    }
  })
  return {
    props: {
      posts
    }
  }
}

export default blogs
