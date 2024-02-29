/* eslint-disable react-hooks/exhaustive-deps */
import styles from '../../styles/Projects.module.css'
import InputGroup from '../../../components/InputGroup'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../config/axios.config'
import ErrorMessage from '../../../components/ErrorMessage'

const AdminCreateCategory = () => {
	const [title, setTitle] = useState('')
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	const createCategory = async (e) => {
		e.preventDefault()

		if (!title) return setError('Please provide a name for category!')

		try {
			await axiosInstance.post(`/categories`, { title })
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}

		navigate('/admin/categories')
	}

	return (
		<>
			<h1>Create new category</h1>
			{error && <ErrorMessage message={error} />}
			<section>
				<form className={styles.createForm}>
					<InputGroup
						label="Category title"
						selector="title"
						required
						onChange={(e) => setTitle(e.target.value)}
					/>

					<button
						type="button"
						onClick={createCategory}
					>
						Create category
					</button>
				</form>
			</section>
		</>
	)
}

export default AdminCreateCategory
