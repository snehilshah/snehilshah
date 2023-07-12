import styles from '../../styles/BlogPopUp.module.css'
import Link from 'next/link'
import clsx from 'clsx'
import { AiFillHeart } from 'react-icons/ai'

const BlogPopUp = () => {
  return (
    <div className='fixed -rotate-90 text-white bottom-52 -left-0 font-supreme'>
      <div className={clsx(styles.animate)}>
        <Link href={'/blogs'} className='text-cyan-200'>
          BLOGS
          <AiFillHeart className='ml-2 mb-1 inline text-cyan-200' />
        </Link>
      </div>
    </div>
  )
}

export default BlogPopUp
