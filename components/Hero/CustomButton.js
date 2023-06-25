import styles from '@/styles/CustomButton.module.css'
import clsx from 'clsx'

const CustomButton = ({ content }) => {
  console.log(styles)
  return (
    <button className={clsx(styles.Custombutton, styles.type1)}>
      <span className={clsx(styles.btnTxt)}>{content}</span>
    </button>
  )
}

export default CustomButton
