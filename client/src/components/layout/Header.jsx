/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import Logo from './Logo'
import styles from './styles/Header.module.css'
import { useAuth } from '../../contexts/AuthContext'
import LogoutButton from '../LogoutButton'

const Header = ({ type }) => {
	const { isLoggedIn, getUsername } = useAuth()

	return (
		<header className={styles.header}>
			<nav className={styles.primaryNavigation}>
				<Logo />
				{type === 'full' && (
					<ul className={styles.navigationList}>
						{/* Links when user is logged in */}
						{isLoggedIn() && (
							<>
								<li className={styles.navigationListItem}>
									<Link
										to="tasks"
										className={styles.navigationLink}
									>
										Tasks
									</Link>
								</li>
								<div className="primary__navigation-group">
									<p>
										Hello, <Link to="/user/">{getUsername()}</Link>
									</p>
								</div>
								<LogoutButton />
							</>
						)}
						{/* Links when user is not logged in */}
						{!isLoggedIn() && (
							<>
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
							</>
						)}
					</ul>
				)}
			</nav>
		</header>
	)
}

export default Header
