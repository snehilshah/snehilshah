import Image from 'next/image'
import styles from '../../../styles/Card.module.css'
import clsx from 'clsx'
function Cards({ title, desc, src, fontSyle, bgColor }) {
  return (
    <div className='hero'>
      <Image
        src={src}
        className='aspect-square object-cover h-full w-full'
        alt='Project Background'
      />
      <div className={`text bg-linear-to-br ${bgColor}`}></div>
      <div className='main-text'>
        <p className={`${fontSyle}` + ' font-supreme text-xl font-normal'}>{title}</p>
      </div>
      <p className=''>{desc}</p>
    </div>
  )
}

export default Cards
