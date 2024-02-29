/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../../styles/Projects.module.css'
import { useEffect, useState } from 'react'
import axiosInstance from '../../../config/axios.config'
import ErrorMessage from '../../../components/ErrorMessage'
import { useAuth } from '../../../contexts/AuthContext'

const AdminEditUser = () => {
	let { state } = useLocation()
	const { id } = state
	const { isLoggedIn, getUserRole } = useAuth()
	const [user, setUser] = useState({})
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await axiosInstance.get(`/users/${id}`)
				setUser(response.data)
			} catch (error) {
				setError(error.message) || setError(error.response.data.message)
			}
		}

		getUser()
	}, [id])

	const handleChanges = (e) => {
		if (e.target.name === 'active') {
			setUser((prev) => ({
				...prev,
				active: e.target.value === 'Yes' ? true : false,
			}))
		} else {
			setUser((prev) => ({
				...prev,
				[e.target.name]: e.target.value,
			}))
		}
	}

	const saveChanges = async () => {
		try {
			await axiosInstance.put(`/users/${id}`, user)
			navigate('/admin/users')
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	return (
		<>
			<h1>Edit user: {user.username}</h1>
			{error && <ErrorMessage message={error} />}
			<section>
				<div className={styles.projectDetails}>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						id="username"
						value={user.username}
						onChange={handleChanges}
					/>

					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={user.email}
						onChange={handleChanges}
					/>

					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						onChange={handleChanges}
					/>

					<label htmlFor="role">Role:</label>
					<select
						name="role"
						id="role"
						value={user.role}
						onChange={handleChanges}
					>
						<option value="user">User</option>
						<option value="admin">Admin</option>
					</select>

					<label htmlFor="active">Active:</label>
					<select
						name="active"
						id="active"
						value={user.active ? 'Yes' : 'No'}
						onChange={handleChanges}
					>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
				</div>
				{isLoggedIn() && getUserRole() === 'admin' && (
					<div>
						<button onClick={saveChanges}>Save changes</button>
						<button onClick={() => navigate('/admin/users')}>Cancel</button>
					</div>
				)}
			</section>
		</>
	)
}

export default AdminEditUser
