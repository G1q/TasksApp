import styles from './styles/Footer.module.css'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContent}>
				<small className={styles.copyright}>&copy;2024 BG</small>
			</div>
		</footer>
	)
}

export default Footer
