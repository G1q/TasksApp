import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputGroup from '../components/InputGroup'
import styles from './styles/Register.module.css'
import ErrorMessage from '../components/ErrorMessage'
import axiosInstance from '../config/axios.config'

const Register = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [terms, setTerms] = useState(false)
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	const registerUser = async (e) => {
		e.preventDefault()

		if (username.length < 3) return setError('Username must have minimum 3 chars')
		if (!/^[A-Za-z0-9]*$/.test(username)) return setError('Username must contain only letters and numbers')

		if (!email) return setError('Email is required!')
		if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) return setError('Email must follow the rules (e.g.: email@example.com)')

		if (password.length < 8) return setError('Password must have minimum 8 characters!')

		if (!terms) return setError('You must accept terms and conditions!')
		setError(false)

		try {
			await axiosInstance.post(`/users`, { username, email, password })
			navigate('/')
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	return (
		<section className={styles.register}>
			<div className={styles.registerContainer}>
				<div className={styles.registerForm}>
					<h1>Create a new account</h1>
					<form className={styles.form}>
						<InputGroup
							label="Username"
							type="text"
							selector="username"
							required
							onChange={(e) => setUsername(e.target.value)}
						/>

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

						<InputGroup
							label="I have read and agreed to the terms and conditions"
							type="checkbox"
							selector="agree"
							required
							onChange={() => setTerms(!terms)}
						/>
						{error && <ErrorMessage message={error} />}
						<button
							type="button"
							onClick={registerUser}
						>
							Create FREE account
						</button>
						<p>
							You allready have an account? Please <Link to="/login">Login</Link> to your account
						</p>
					</form>
				</div>
				<div className={styles.registerInfo}></div>
			</div>
		</section>
	)
}

export default Register
