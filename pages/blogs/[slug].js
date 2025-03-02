import { useState } from 'react'
import fs from 'fs'
import path from 'path'
import BlogNav from '@/components/Blog/BlogNav'
import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import {
  InfoBox,
  ErrorBox,
  WarningBox,
  ImageBox,
  CodeBox,
  StyleBox
} from '@/components/MdxHelpers/Boxes'
import { Standout } from '@/components/MdxHelpers/Texts'
import { motion, cubicBezier } from 'framer-motion'

const components = {
  InfoBox,
  ErrorBox,
  WarningBox,
  ImageBox,
  CodeBox,
  Standout,
  StyleBox
}

const bezierEase = cubicBezier(0.69, 0, 0.21, 1)

const imageVariants = {
  initial: { scale: 0.8 },
  animate: {
    scale: [0.8, 1.7, 1],
    transition: { duration: 4, ease: bezierEase }
  },
  static: {
    scale: 1,
    transition: { duration: 0.8, ease: bezierEase }
  },
  hover: {
    scale: 1.2,
    transition: { duration: 0.8, ease: bezierEase }
  }
}
function PostPage({
  frontmatter: { title, description, header, cover_image },
  mdxSource
}) {
  const [animationComplete, setAnimationComplete] = useState(false)
  let homeLink = 'https://www.snehilshah.com'
  return (
    <main className='bg-[#FFF0DF]'>
      <Head>
        <title>{title}</title>
        <meta property='og:title' content={title} />
        <meta name='description' content={description} />
        <meta property='og:description' content={description} />
        <meta name='image' content={homeLink + cover_image} />
        <meta property='og:image' content={homeLink + cover_image} />
      </Head>
      <BlogNav />
      <div className='w-full bg-black h-[30rem] overflow-hidden'>
        <motion.img
          src={header}
          alt={'header_img'}
          variants={imageVariants}
          initial='initial'
          animate={animationComplete ? 'static' : 'animate'}
          whileHover='hover'
          onAnimationComplete={() => setAnimationComplete(true)}
          className='w-full h-[30rem] object-cover rounded-3xl'
        />
      </div>
      <article className='font-copernicus max-w-4xl mx-auto p-5 prose prose-lg prose-colorful prose-a:text-[#21516F] text-justify'>
        <h1 className='text-4xl mt-10 text-center font-bold mb-4 bg-gradient-to-r text-[#59321A]'>
          {title}
        </h1>
        <hr className='w-24 h-1 bg-[#59321A] mx-auto my-4 border-0' />
        <h2 className='text-xl font-light mb-8 mt-1 text-center italic text-[#4f2b15]'>
          {description}
        </h2>
        <MDXRemote {...mdxSource} components={components} />
      </article>
    </main>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.mdx', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.mdx'),
    'utf-8'
  )

  const mdxSource = await serialize(markdownWithMeta, {
    parseFrontmatter: true
  })

  const { frontmatter } = mdxSource

  return {
    props: {
      frontmatter,
      slug,
      mdxSource
    }
  }
}

export default PostPage
