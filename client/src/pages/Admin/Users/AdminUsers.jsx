/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import styles from '../../styles/Projects.module.css'
import { Link } from 'react-router-dom'
import axiosInstance from '../../../config/axios.config'
import ErrorMessage from '../../../components/ErrorMessage'
import { useAuth } from '../../../contexts/AuthContext'
import NoPermissions from '../../../components/NoPermissions'

const AdminUsers = () => {
	const { isLoggedIn, getUserRole, getUserId } = useAuth()
	const [users, setUsers] = useState([])
	const [error, setError] = useState(false)

	useEffect(() => {
		getUsers()
	}, [])

	const getUsers = async () => {
		try {
			const response = await axiosInstance.get('users')
			setUsers(response.data)
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	const deleteUser = async (id) => {
		try {
			await axiosInstance.delete(`/users/${id}`)
			getUsers()
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	return (
		<>
			<h1>Users</h1>
			<Link to="./create">Create new user</Link>
			{isLoggedIn() && getUserRole() === 'admin' ? (
				<section>
					{error && <ErrorMessage message={error} />}
					<table className={styles.dataTable}>
						<thead>
							<tr>
								<th>Username</th>
								<th>Email</th>
								<th>Role</th>
								<th>Active</th>
								<th>View</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user._id}>
									<td>{user.username}</td>
									<td>{user.email}</td>
									<td>{user.role}</td>
									<td>{user.active ? 'Yes' : 'No'}</td>
									<td>
										<Link to={`./view/${user._id}`}>View</Link>
									</td>
									<td>
										<Link
											to="./edit"
											state={{ id: user._id }}
										>
											Edit
										</Link>
									</td>
									<td>{getUserId() !== user._id && <button onClick={() => deleteUser(user._id)}>&times;</button>}</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>
			) : (
				<NoPermissions />
			)}
		</>
	)
}

export default AdminUsers
