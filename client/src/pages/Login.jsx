import { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import InputGroup from '../components/InputGroup'
import styles from './styles/Login.module.css'
import ErrorMessage from '../components/ErrorMessage'
import axiosInstance from '../config/axios.config'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
	const { isLoggedIn } = useAuth()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	const loginUser = async (e) => {
		e.preventDefault()

		if (!email) return setError('Email is required!')
		if (!password) return setError('Password is required!')

		setError(false)

		try {
			const response = await axiosInstance.post(`/auth/login`, { email, password })
			localStorage.setItem('token', response.data.token)
			navigate(0)
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	return (
		<section>
			{!isLoggedIn() ? (
				<div className={styles.loginContainer}>
					<h1>Login</h1>
					<form className={styles.form}>
						<InputGroup
							label="Email"
							type="email"
							selector="email"
							required
							onChange={(e) => setEmail(e.target.value)}
						/>

						<InputGroup
							label="Password"
							type="password"
							selector="password"
							required
							onChange={(e) => setPassword(e.target.value)}
						/>

						{error && <ErrorMessage message={error} />}
						<button
							type="button"
							onClick={loginUser}
						>
							Login
						</button>
						<p>
							You do not have an account? Please <Link to="/register">register</Link> a new one
						</p>
					</form>
				</div>
			) : (
				<Navigate to="/" />
			)}
		</section>
	)
}

export default Login
