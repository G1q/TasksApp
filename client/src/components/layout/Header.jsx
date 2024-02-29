/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import Logo from './Logo'
import styles from './styles/Header.module.css'
import { useAuth } from '../../contexts/AuthContext'
import LogoutButton from '../LogoutButton'

const Header = ({ type, role }) => {
	const { isLoggedIn, getUsername, getUserRole } = useAuth()

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
										to="/projects"
										className={styles.navigationLink}
									>
										Projects
									</Link>
								</li>
								<li className={styles.navigationListItem}>
									<Link
										to="/tasks"
										className={styles.navigationLink}
									>
										Tasks
									</Link>
								</li>
								{getUserRole() === 'admin' && (
									<li className={styles.navigationListItem}>
										<Link
											to="/admin"
											className={styles.navigationLink}
										>
											Admin dashboard
										</Link>
									</li>
								)}
								<div className="primary__navigation-group">
									<p>
										Hello, <Link to="/user">{getUsername()}</Link>
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
										to="/register"
										className={styles.navigationLink}
									>
										Register
									</Link>
								</li>
								<li className={styles.navigationListItem}>
									<Link
										to="/login"
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

			{isLoggedIn() && getUserRole() === 'admin' && role === 'admin' && (
				<>
					<hr className={styles.separator} />
					<nav className={styles.adminNavigation}>
						<ul className={styles.navigationList}>
							<li className={styles.navigationListItem}>
								<Link
									to="projects"
									className={styles.navigationLink}
								>
									Projects
								</Link>
								<Link
									to="/admin/tasks"
									className={styles.navigationLink}
								>
									Tasks
								</Link>
								<Link
									to="/admin/users"
									className={styles.navigationLink}
								>
									Users
								</Link>
								<Link
									to="/admin/categories"
									className={styles.navigationLink}
								>
									Categories
								</Link>
								<Link
									to="/admin/logs"
									className={styles.navigationLink}
								>
									Logs
								</Link>
							</li>
						</ul>
					</nav>
				</>
			)}
		</header>
	)
}

export default Header
