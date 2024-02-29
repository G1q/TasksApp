/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import styles from '../../styles/Projects.module.css'
import { Link } from 'react-router-dom'
import axiosInstance from '../../../config/axios.config'
import ErrorMessage from '../../../components/ErrorMessage'
import { useAuth } from '../../../contexts/AuthContext'
import NoPermissions from '../../../components/NoPermissions'

const AdminCategories = () => {
	const { isLoggedIn, getUserRole } = useAuth()
	const [categories, setCategories] = useState([])
	const [error, setError] = useState(false)

	useEffect(() => {
		getCategories()
	}, [])

	const getCategories = async () => {
		try {
			const response = await axiosInstance.get('categories')
			setCategories(response.data)
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	const deleteCategory = async (id) => {
		try {
			await axiosInstance.delete(`/categories/${id}`)
			getCategories()
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	return (
		<>
			<h1>Categories</h1>
			<Link to="./create">Create new category</Link>
			{isLoggedIn() && getUserRole() === 'admin' ? (
				<section>
					{error && <ErrorMessage message={error} />}
					<table className={styles.dataTable}>
						<thead>
							<tr>
								<th>Title</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{categories.map((category) => (
								<tr key={category._id}>
									<td>{category.title}</td>
									<td>
										<Link
											to="./edit"
											state={{ id: category._id }}
										>
											Edit
										</Link>
									</td>
									<td>
										<button onClick={() => deleteCategory(category._id)}>&times;</button>
									</td>
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

export default AdminCategories
