import Image from 'next/image'
import styles from '../../../styles/Card.module.css'
import clsx from 'clsx'
function Cards({ title, desc, src, classes }) {
  return (
    <div className={clsx(styles.card + ' my-10 mr-2 ' + classes)}>
      <Image
        src={src}
        className='overflow-hidden object-cover'
        alt='Project Background'
      />
      <div className={clsx(styles.card__content) + ' '}>
        <p className={clsx(styles.card__title) + ''}>{title}</p>
        <p className={clsx(styles.card__description) + ''}>{desc}</p>
      </div>
    </div>
  )
}

export default Cards
