import styles from '@/styles/CustomButton.module.css'
import clsx from 'clsx'
import Link from 'next/link'

const CustomButton = ({ content, link }) => {
  return (
    <Link href={link}>
      <button className={clsx(styles.Custombutton, styles.type1)}>
        <span className={clsx(styles.btnTxt)}>{content}</span>
      </button>
    </Link>
  )
}

export default CustomButton
