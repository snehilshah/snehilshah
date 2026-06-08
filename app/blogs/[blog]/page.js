import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { compileMDX } from 'next-mdx-remote/rsc'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import BlogTopbar from '@/components/Blog/BlogTopbar'
import ReadingProgress from '@/components/Blog/ReadingProgress'
import PostTOC from '@/components/Blog/PostTOC'
import ShareRow from '@/components/Blog/ShareRow'
import {
  InfoBox,
  TipBox,
  ErrorBox,
  WarningBox,
  ImageBox,
  CodeBox,
  StyleBox
} from '../mdx-helpers/boxes'
import { Standout } from '../mdx-helpers/texts'
import { getFrontMatter } from '@/lib/helpers'
import { getAllPosts, getToc, readingTime, slugify } from '@/lib/blog'
import '../blog-rework.css'

export const dynamicParams = false
export const dynamic = 'force-static'

// give h2 headings stable ids matching the TOC slugs
const H2 = ({ children }) => {
  const text =
    typeof children === 'string'
      ? children
      : Array.isArray(children)
        ? children.filter(c => typeof c === 'string').join('')
        : ''
  return <h2 id={slugify(text)}>{children}</h2>
}

const components = {
  InfoBox,
  TipBox,
  ErrorBox,
  WarningBox,
  ImageBox,
  CodeBox,
  Standout,
  StyleBox,
  h2: H2
}

export async function generateMetadata({ params }) {
  const { blog } = await params
  const frontmatter = getFrontMatter(path.join('posts', blog + '.mdx'))
  const homeLink = 'https://www.snehilshah.com'

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      images: [{ url: `${homeLink}${frontmatter.header}` }]
    }
  }
}

async function PostPage({ params }) {
  const { blog } = await params
  const raw = fs.readFileSync(path.join('posts', blog + '.mdx'), 'utf-8')

  const { content, frontmatter } = await compileMDX({
    source: raw,
    options: { parseFrontmatter: true },
    components
  })

  const toc = getToc(raw)
  const read = readingTime(raw)
  const topic = frontmatter.topic || 'General'

  const posts = getAllPosts()
  const idx = posts.findIndex(p => p.slug === blog)
  const next = posts.length > 1 ? posts[(idx + 1) % posts.length] : null

  return (
    <main className='paper'>
      <ReadingProgress />
      <BlogTopbar />

      <div className='post-top'>
        <Link className='backlink' href='/blogs'>
          <ArrowLeft /> All posts
        </Link>
        <span className='post-top__topic'>{topic}</span>
      </div>

      <div className='post-hero-wrap'>
        <div className='post-hero'>
          <img src={frontmatter.header} alt={frontmatter.title} />
        </div>
      </div>

      <header className='post-head'>
        <div className='post-head__meta'>
          <span className='post-head__topic'>{topic}</span>
          <span>{frontmatter.date}</span>
          <span>{read} min read</span>
        </div>
        <h1>{frontmatter.title}</h1>
        <p className='post-head__dek'>{frontmatter.description}</p>
        <hr className='post-head__rule' />
      </header>

      <div className='article-shell'>
        <PostTOC toc={toc} />
        <article className='article'>{content}</article>
      </div>

      <div className='post-foot'>
        <div className='post-foot__card'>
          <img
            className='post-foot__avatar'
            src='/SnehilImage.jpg'
            alt='Snehil Shah'
          />
          <div className='post-foot__who'>
            <div className='post-foot__name'>Snehil Shah</div>
            <div className='post-foot__bio'>
              SDE &amp; coding enthusiast. Writing about browsers, dev tooling,
              and a calmer desktop.
            </div>
          </div>
          <ShareRow title={frontmatter.title} />
        </div>
      </div>

      {next && next.slug !== blog && (
        <div className='post-nav'>
          <Link href={`/blogs/${next.slug}`}>
            Next: {next.frontmatter.title} <ArrowRight />
          </Link>
        </div>
      )}
    </main>
  )
}

export async function generateStaticParams() {
  const blogs = fs.readdirSync(path.join('posts'), 'utf-8')
  return blogs.map(blog => ({ blog: blog.replace('.mdx', '') }))
}

export default PostPage
