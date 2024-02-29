/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from 'react-router-dom'
import styles from '../../styles/Projects.module.css'
import { useEffect, useState } from 'react'
import axiosInstance from '../../../config/axios.config'
import ErrorMessage from '../../../components/ErrorMessage'
import { useAuth } from '../../../contexts/AuthContext'
import { formatFullDate } from '../../../utilities/formatDate'

const AdminViewTask = () => {
	const { id } = useParams()
	const { isLoggedIn, getUserRole } = useAuth()
	const [task, setTask] = useState({})
	const [project, setProject] = useState({})
	const [category, setCategory] = useState({})
	const [error, setError] = useState(false)

	useEffect(() => {
		const getTask = async () => {
			try {
				const response = await axiosInstance.get(`/tasks/${id}`)
				setTask(response.data)
				setProject(response.data.project)
				setCategory(response.data.category)
			} catch (error) {
				setError(error.message) || setError(error.response.data.message)
			}
		}

		getTask()
	}, [id])

	return (
		<>
			<h1>Project: {task.title}</h1>
			{error && <ErrorMessage message={error} />}
			<section>
				<div className={styles.projectDetails}>
					<p>Created on: {formatFullDate(task.createdAt)}</p>
					<p>Last update on: {formatFullDate(task.updatedAt)}</p>
					<p>Status: {task.status}</p>
					<p>Project: {project.title}</p>
					<p>Category: {category.title}</p>
					<p>Priority: {task.priority}</p>
					<p>Description: {task.description}</p>
				</div>

				{isLoggedIn() && getUserRole() === 'admin' && (
					<Link
						to="/admin/tasks/edit"
						state={{ id: task._id }}
					>
						Edit project
					</Link>
				)}
			</section>
		</>
	)
}

export default AdminViewTask
