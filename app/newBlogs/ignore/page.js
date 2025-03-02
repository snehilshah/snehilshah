import fs from 'fs'
import path from 'path'
import BlogNav from '@/components/Blog/BlogNav'
import Head from 'next/head'
import * as runtime from 'react/jsx-runtime'
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

export default async function Page() {
  const filePath = path.join('posts', 'winget.mdx')
  const fileContent = fs.readFileSync(filePath, 'utf8')

  return (
    <article className='max-w-4xl mx-auto p-5 prose prose-lg rounded-3xl prose-a:text-emerald-500 text-justify'>
      <h1 className='text-5xl mt-10 text-center font-bold mb-10'>title</h1>
      <h2 className='text-xl font-light text-stone-700 mb-2 mt-1 text-center'>
        description
      </h2>
    </article>
    // <div className='prose'>
    //   <h1>Title</h1>
    //   <Content components={components} />
    // </div>
  )
}
