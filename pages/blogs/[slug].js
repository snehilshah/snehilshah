import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import BlogNav from '@/components/Blog/BlogNav'
import Head from 'next/head'

function PostPage({
  frontmatter: { title, date, cover_image, description },
  slug,
  content
}) {
  marked.use({
    langPrefix: '',
    mangle: false,
    headerIds: false
  })
  return (
    <main>
      <Head>
        <title>{title}</title>
      </Head>
      <BlogNav />
      <img
        src={cover_image}
        alt='cover_image'
        className='w-full h-60 object-cover'
      />
      <article className='max-w-4xl mx-auto p-5 prose prose-stone rounded-3xl'>
        <h1 className='text-3xl mt-10 mb-3 text-center font-bold'>{title}</h1>
        <h2 className='text-xl font-light text-stone-700 mb-2'>description</h2>
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
