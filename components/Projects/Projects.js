import Image from 'next/image'
import Blue from '../../public/Blue.jpeg'
import styles from '../../styles/Card.module.css'
import clsx from 'clsx'
const Projects = () => {
  return (
    <div className={clsx(styles.card + ' ml-9')}>
      <Image src={Blue} className='bg-contain'/>
      <div className={clsx(styles.card__content)}>
        <p className={clsx(styles.card__title)}>Card Title</p>
        <p className={clsx(styles.card__description)}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco.
        </p>
      </div>
    </div>
  )
}

export default Projects
{
  /* <Atropos
        classNameName='w-72 h-72 text-white flex justify-center items-center text-center'
        shadow={false}
      >
        <Image src={Blue} alt='Hello' />
      </Atropos>
 */
}
