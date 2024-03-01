/* eslint-disable react-hooks/exhaustive-deps */
import styles from '../../styles/Projects.module.css'
import InputGroup from '../../../components/InputGroup'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../config/axios.config'
import ErrorMessage from '../../../components/ErrorMessage'

const AdminCreateUser = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	const createUser = async (e) => {
		e.preventDefault()

		if (!username) return setError('Please provide a username!')
		if (!email) return setError('Please provide an email!')
		if (!password) return setError('Please provide a password!')

		try {
			await axiosInstance.post(`/users`, { username, email, password })
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}

		navigate('/admin/users')
	}

	return (
		<>
			<h1>Create new user</h1>
			{error && <ErrorMessage message={error} />}
			<section>
				<form className={styles.createForm}>
					<InputGroup
						label="Username"
						selector="username"
						required
						onChange={(e) => setUsername(e.target.value)}
					/>

					<InputGroup
						label="Email"
						selector="email"
						type="email"
						required
						onChange={(e) => setEmail(e.target.value)}
					/>

					<InputGroup
						label="Password"
						selector="password"
						type="password"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button
						type="button"
						onClick={createUser}
					>
						Create user
					</button>
				</form>
			</section>
		</>
	)
}

export default AdminCreateUser
