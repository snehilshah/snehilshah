import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import BlogNav from '@/components/Blog/BlogNav'
import Head from 'next/head'

function PostPage({
  frontmatter: { title, date, cover_image, description, header },
  slug,
  content
}) {
  marked.use({
    langPrefix: '',
    mangle: false,
    headerIds: false
  })
  return (
    <main className='bg-[#dbe1f193]'>
      <Head>
        <title>{title}</title>
        <meta name='author' content='Snehil, Snehil Shah, Shah' />
      </Head>
      <BlogNav />
      <img
        src={header}
        alt='cover_image'
        className='w-full h-60 object-cover'
      />
      <article className='max-w-4xl mx-auto p-5 prose rounded-3xl'>
        <div className='font-cabinet'>
          <h1 className='text-5xl mt-10 text-center font-bold mb-0'>{title}</h1>
          <h2 className='text-xl font-light text-stone-700 mb-2 mt-1 text-center'>
            {description}
          </h2>
        </div>
        <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
      </article>
    </main>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      slug,
      content
    }
  }
}

export default PostPage
