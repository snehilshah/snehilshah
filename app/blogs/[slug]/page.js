import fs from 'fs'
import path from 'path'
import BlogNav from '@/components/Blog/BlogNav'
import Head from 'next/head'
import { compileMDX } from 'next-mdx-remote/rsc'
import {
  InfoBox,
  ErrorBox,
  WarningBox,
  ImageBox,
  CodeBox,
  StyleBox
} from '@/components/MdxHelpers/Boxes'
import { Standout } from '@/components/MdxHelpers/Texts'

const components = {
  InfoBox,
  ErrorBox,
  WarningBox,
  ImageBox,
  CodeBox,
  StyleBox,
  Standout
}

export default async function Page({ params }) {
  const slug = await params.slug
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.mdx'),
    'utf-8'
  )

  const { content, frontmatter } = await compileMDX({
    source: markdownWithMeta,
    components,
    options: {
      parseFrontmatter: true,
    }
  })
  
  const { title, date, description, header, cover_image } = frontmatter
  const homeLink = 'https://www.snehilshah.com'
  
  return (
    <main className='bg-[#dbe1f193]'>
      <Head>
        <title>{title}</title>
        <meta property='og:title' content={title} />
        <meta name='description' content={description} />
        <meta property='og:description' content={description} />
        <meta name='image' content={homeLink + cover_image} />
        <meta property='og:image' content={homeLink + cover_image} />
      </Head>
      <BlogNav />
      <img
        src={header}
        alt={'header_img'}
        className='w-full h-60 object-cover'
      />
      <article className='max-w-4xl mx-auto p-5 prose rounded-3xl prose-a:text-emerald-500 text-justify'>
        <div className='font-prsans'>
          <h1 className='text-5xl mt-10 text-center font-bold mb-0S'>
            {title}
          </h1>
          <h2 className='text-xl font-light text-stone-700 mb-2 mt-1 text-center'>
            {description}
          </h2>
        </div>
        {content}
      </article>
    </main>
  )
}