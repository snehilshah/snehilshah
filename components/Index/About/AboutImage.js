import Image from 'next/image'
import Blue from '../../../public/Blue.jpeg'
import Hero from '../../../public/Hero.png'
import clsx from 'clsx'
import styles from '../../../styles/AboutImg.module.css'

const AboutImage = () => {
  return (
    <div
      id={clsx(styles.personContainer)}
      className='max-w-[15rem] mx-auto relative'
    >
      <div
        id='personContainer'
        className='aspect-[1/1.2] grid items-end rounded-t-none rounded-b-full overflow-hidden'
      >
        <Image
          id='personCircle'
          src={Blue}
          className='absolute aspect-square object-cover w-full top-auto inset-x-0 bottom-0 mx-auto rounded-full'
        />
        <Image
          id={clsx(styles.personImg)}
          src={Hero}
          className='relative z-20 w-[90%] mx-auto'
        />
      </div>
    </div>
  )
}

export default AboutImage

//
