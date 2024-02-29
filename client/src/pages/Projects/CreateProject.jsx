/* eslint-disable react-hooks/exhaustive-deps */
import styles from '../styles/Projects.module.css'
import InputGroup from '../../components/InputGroup'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../config/axios.config'
import ErrorMessage from '../../components/ErrorMessage'
import { useAuth } from '../../contexts/AuthContext'

const CreateProject = () => {
	const { getUserId } = useAuth()
	const [title, setTitle] = useState('')
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	const createProject = async (e) => {
		e.preventDefault()

		if (!title) return setError('Please provide a name for project!')

		try {
			await axiosInstance.post(`/projects`, { title, admin: getUserId() })
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}

		navigate('/projects')
	}

	return (
		<>
			<h1>Create new project</h1>
			{error && <ErrorMessage message={error} />}
			<section>
				<form className={styles.createForm}>
					<InputGroup
						label="Project title"
						selector="title"
						required
						onChange={(e) => setTitle(e.target.value)}
					/>

					<button
						type="button"
						onClick={createProject}
					>
						Create project
					</button>
				</form>
			</section>
		</>
	)
}

export default CreateProject
