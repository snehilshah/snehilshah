import styles from '@/styles/Loader.module.css'
import clsx from 'clsx'
const Loader = () => {
	return (
		<div id={clsx(styles.loader)}>
			<div id={clsx(styles.wrapperload)}>
				<div className={clsx(styles.elem)}>
					<h3>Hello World!!</h3>
				</div>
				<div className={clsx(styles.elem)}>
					<h3>Snehil Shah</h3>
				</div>
			</div>
		</div>
	)
}

export default Loader
