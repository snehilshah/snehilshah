import { Metadata } from 'next'

async function getBlogData() {
  // You can fetch this from your MDX files or any other source
  return {
    title: 'AI and Machine Learning',
    description: 'Exploring AI concepts...'
  }
}

export async function generateMetadata() {
  const blogData = await getBlogData()

  return {
    title: blogData.title,
    description: blogData.description
  }
}

export default function MDXLayout({ children }) {
  return (
    <div>
      <header className='bg-gradient-to-r from-blue-500 to-purple-500 text-white py-8'>
        <div className='max-w-3xl mx-auto px-4'>
          {/* <h1 className='text-3xl font-bold mb-2'>{metadata?.title}</h1> */}
          <p className='text-lg opacity-90'>
            {/* {metadata?.description || 'Welcome to my blog'} */}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-3xl mx-auto px-4 py-8 prose prose-lg'>
        {children}
      </main>

      {/* Footer */}
      <footer className='border-t border-gray-100 dark:border-zinc-800 py-8'>
        <div className='max-w-3xl mx-auto px-4 text-gray-600 dark:text-gray-400'>
          <p>© {new Date().getFullYear()} All rights reserved</p>
        </div>
      </footer>
    </div>
  )
}
