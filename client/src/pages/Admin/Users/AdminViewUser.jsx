/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from 'react-router-dom'
import styles from '../../styles/Projects.module.css'
import { useEffect, useState } from 'react'
import axiosInstance from '../../../config/axios.config'
import ErrorMessage from '../../../components/ErrorMessage'
import { useAuth } from '../../../contexts/AuthContext'
import { formatFullDate } from '../../../utilities/formatDate'

const AdminViewUser = () => {
	const { id } = useParams()
	const { isLoggedIn, getUserRole } = useAuth()
	const [user, setUser] = useState({})
	const [error, setError] = useState(false)

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

	return (
		<>
			<h1>{`View ${user.username}'s details`}</h1>
			{error && <ErrorMessage message={error} />}
			<section>
				<div className={styles.projectDetails}>
					<p>Created on: {formatFullDate(user.createdAt)}</p>
					<p>Last update on: {formatFullDate(user.updatedAt)}</p>
					<p>Active: {user.active ? 'Yes' : 'No'}</p>
					<p>Role: {user.role}</p>
					<p>Email: {user.email}</p>
				</div>

				{isLoggedIn() && getUserRole() === 'admin' && (
					<Link
						to="/admin/users/edit"
						state={{ id: user._id }}
					>
						Edit user
					</Link>
				)}
			</section>
		</>
	)
}

export default AdminViewUser
