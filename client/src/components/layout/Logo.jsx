import { Link } from 'react-router-dom'
import styles from './styles/Logo.module.css'

const Logo = () => {
	return (
		<div className={styles.logo}>
			<Link to="/">TaskApp</Link>
		</div>
	)
}

export default Logo
