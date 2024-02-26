/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import Logo from './Logo'
import styles from './styles/Header.module.css'

const Header = ({ type }) => {
	return (
		<header className={styles.header}>
			<nav className={styles.primaryNavigation}>
				<Logo />
				{type === 'full' && (
					<ul className={styles.navigationList}>
						<li className={styles.navigationListItem}>
							<Link
								to="register"
								className={styles.navigationLink}
							>
								Register
							</Link>
						</li>
						<li className={styles.navigationListItem}>
							<Link
								to="login"
								className={styles.navigationLink}
							>
								Login
							</Link>
						</li>
					</ul>
				)}
			</nav>
		</header>
	)
}

export default Header
