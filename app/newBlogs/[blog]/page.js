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

export const dynamicParams = false

const components = {
  InfoBox,
  ErrorBox,
  WarningBox,
  ImageBox,
  CodeBox,
  StyleBox,
  Standout
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(filename => {
    return { blog: filename.replace('.mdx', '') }
  })

  return paths
}

export default async function Page({ params }) {
  return <h1>Test</h1>
}
