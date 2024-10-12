import Image from 'next/image'
import styles from '../../../styles/Card.module.css'
import clsx from 'clsx'
function Cards({ title, desc, src, classes, bgColor }) {
  return (
    <div class='hero'>
      <Image
        src={src}
        className='aspect-square object-cover h-full w-full'
        alt='Project Background'
      />
      <div className={`text bg-gradient-to-br ${bgColor}`}></div>
      <div class='main-text'>
        <p className={`${classes}`}>{title}</p>
      </div>
      <p className=''>{desc}</p>
    </div>
  )
}

export default Cards
