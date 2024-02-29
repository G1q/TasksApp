/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../../styles/Projects.module.css'
import { useEffect, useState } from 'react'
import axiosInstance from '../../../config/axios.config'
import ErrorMessage from '../../../components/ErrorMessage'
import { useAuth } from '../../../contexts/AuthContext'
import { formatFullDate } from '../../../utilities/formatDate'

const AdminEditCategory = () => {
	let { state } = useLocation()
	const { id } = state
	const { isLoggedIn, getUserRole } = useAuth()
	const [category, setCategory] = useState({})
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		const getCategory = async () => {
			try {
				const response = await axiosInstance.get(`/categories/${id}`)
				setCategory(response.data)
			} catch (error) {
				setError(error.message) || setError(error.response.data.message)
			}
		}

		getCategory()
	}, [id])

	const handleChanges = (e) => {
		setCategory((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const saveChanges = async () => {
		try {
			await axiosInstance.put(`/categories/${id}`, category)
			navigate('/admin/categories')
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	return (
		<>
			<h1>Edit category: {category.title}</h1>
			{error && <ErrorMessage message={error} />}
			<section>
				<div className={styles.projectDetails}>
					<p>Created on: {formatFullDate(category.createdAt)}</p>
					<p>Last update on: {formatFullDate(category.updatedAt)}</p>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						value={category.title}
						onChange={handleChanges}
					/>
				</div>
				{isLoggedIn() && getUserRole() === 'admin' && (
					<div>
						<button onClick={saveChanges}>Save changes</button>
						<button onClick={() => navigate('/admin/categories')}>Cancel</button>
					</div>
				)}
			</section>
		</>
	)
}

export default AdminEditCategory
