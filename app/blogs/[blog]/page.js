import fs from 'fs'
import path from 'path'
import BlogNav from '@/components/Blog/BlogNav'
import { compileMDX } from 'next-mdx-remote/rsc'
import AnimatedImage from './AnimatedImage'
import {
  InfoBox,
  ErrorBox,
  WarningBox,
  ImageBox,
  CodeBox,
  StyleBox
} from '../mdx-helpers/boxes'
import { Standout } from '../mdx-helpers/texts'

export const dynamicParams = false
const components = {
  InfoBox,
  ErrorBox,
  WarningBox,
  ImageBox,
  CodeBox,
  Standout,
  StyleBox
}

export async function generateMetadata({ params }) {
  const { blog } = await params
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', blog + '.mdx'),
    'utf-8'
  )

  const { frontmatter } = await compileMDX({
    source: markdownWithMeta,
    options: { parseFrontmatter: true }
  })

  const homeLink = 'https://www.snehilshah.com'

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      images: [
        {
          url: `${homeLink}${frontmatter.header}`
        }
      ]
    }
  }
}

async function PostPage({ params }) {
  const { blog } = await params
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', blog + '.mdx'),
    'utf-8'
  )

  const { content, frontmatter } = await compileMDX({
    source: markdownWithMeta,
    options: { parseFrontmatter: true },
    components
  })

  return (
    <main className='bg-[#FFF0DF]'>
      <BlogNav />
      <div className='w-full bg-black h-[30rem] overflow-hidden'>
        <AnimatedImage src={frontmatter.header} />
      </div>
      <article className='font-copernicus max-w-4xl mx-auto p-5 prose prose-base md:prose-lg prose-colorful prose-a:text-[#21516F] prose-ul:text-[#59321A] text-justify'>
        <h1 className='text-2xl md:text-4xl mt-10 text-center font-bold mb-4 bg-gradient-to-r text-[#59321A]'>
          {frontmatter.title}
        </h1>
        <hr className='w-24 h-1 bg-[#59321A] mx-auto my-4 border-0' />
        <h2 className='text-base md:text-xl font-light mb-8 mt-1 text-center italic text-[#4f2b15]'>
          {frontmatter.description}
        </h2>
        {content}
      </article>
    </main>
  )
}

export async function generateStaticParams() {
  const blogs = fs.readdirSync(path.join('posts'), 'utf-8')
  return blogs.map(blog => ({ blog: blog.replace('.mdx', '') }))
}

export default PostPage
