/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../styles/Projects.module.css'
import { useEffect, useState } from 'react'
import axiosInstance from '../../config/axios.config'
import ErrorMessage from '../../components/ErrorMessage'
import { useAuth } from '../../contexts/AuthContext'
import { formatFullDate } from '../../utilities/formatDate'
import { PROJECT_STATUS } from '../../data/status'

const EditProject = () => {
	let { state } = useLocation()
	const { id } = state
	const { getUserId } = useAuth()
	const [project, setProject] = useState({})
	const [admin, setAdmin] = useState([])
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		const getProject = async () => {
			try {
				const response = await axiosInstance.get(`/projects/${id}`)
				setProject(response.data)
				setAdmin(response.data.admin)
			} catch (error) {
				setError(error.message) || setError(error.response.data.message)
			}
		}

		getProject()
	}, [id])

	const handleChanges = (e) => {
		setProject((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const saveChanges = async () => {
		try {
			await axiosInstance.put(`/projects/${id}`, { ...project })
			navigate('/projects')
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	return (
		<>
			<h1>Edit project: {project.title}</h1>
			{error && <ErrorMessage message={error} />}
			<section>
				<div className={styles.projectDetails}>
					<p>Created on: {formatFullDate(project.createdAt)}</p>
					<p>Last update on: {formatFullDate(project.updatedAt)}</p>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						value={project.title}
						onChange={handleChanges}
					/>

					<label htmlFor="status">Status:</label>
					<select
						name="status"
						id="status"
						value={project.status}
						onChange={handleChanges}
					>
						{PROJECT_STATUS.map((status) => (
							<option
								key={status}
								value={status}
							>
								{status}
							</option>
						))}
					</select>
				</div>
				{admin._id === getUserId() && (
					<div>
						<button onClick={saveChanges}>Save changes</button>
						<button onClick={() => navigate('/projects')}>Cancel</button>
					</div>
				)}
			</section>
		</>
	)
}

export default EditProject
