import styles from '../../styles/BlogPopUp.module.css'
import Link from 'next/link'
import clsx from 'clsx'
import { Heart } from 'lucide-react'

const BlogPopUp = () => {
  return (
    <div className='hidden md:block fixed -rotate-90 text-white bottom-52 -left-0 font-supreme'>
      <div className={clsx(styles.animate)}>
        <Link href={'/blogs'} className='text-cyan-200'>
          BLOGS
          <Heart className='ml-1 mb-1 inline w-4 fill-red-400 text-cyan-200' />
        </Link>
      </div>
    </div>
  )
}

export default BlogPopUp
