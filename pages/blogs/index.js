import BlogNav from '@/components/Blog/BlogNav'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import BlogHero from '@/components/Blog/BlogHero'
import BlogBGGrid from '@/components/Blog/BlogBGGrid'
import Head from 'next/head'
// import Image from 'next/image'

function blogs({ posts }) {
  return (
    <div className={'max-w-screen-2xl mx-auto'}>
      <Head>
        <title>Snehil Shah | Blogs</title>
        <meta property='og:title' content='Snehil Shah | Blogs' />
        <meta name='description' content='Blogging Website for Snehil Shah' />
        <meta
          property='og:description'
          content='Blogging Website for Snehil Shah'
        />
        <meta
          name='image'
          content='https://raw.githubusercontent.com/srshah27/srshah27/master/public/SnehilImage.jpg?token=GHSAT0AAAAAACD2NHDQ63AMHPRFZKQU6XAMZGO2G2A'
        />
        <meta
          property='og:image'
          content='https://raw.githubusercontent.com/srshah27/srshah27/master/public/SnehilImage.jpg?token=GHSAT0AAAAAACD2NHDQ63AMHPRFZKQU6XAMZGO2G2A'
        />
      </Head>

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

                <p className='min-w-[5rem] whitespace-nowrap'>
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

export async function getStaticProps() {
  // get the files with from the directory posts
  const files = fs.readdirSync(path.join('posts'))
  console.log('Slugs:')
  const posts = files.map(filename => {
    // remove the .md file extension
    const slugs = filename.replace('.mdx', '')
    console.info(slugs)
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
