/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from 'react-router-dom'
import styles from '../../styles/Projects.module.css'
import { useEffect, useState } from 'react'
import axiosInstance from '../../../config/axios.config'
import ErrorMessage from '../../../components/ErrorMessage'
import { useAuth } from '../../../contexts/AuthContext'
import { formatFullDate } from '../../../utilities/formatDate'

const AdminViewProject = () => {
	const { id } = useParams()
	const { isLoggedIn, getUserRole } = useAuth()
	const [project, setProject] = useState({})
	const [error, setError] = useState(false)

	useEffect(() => {
		const getProject = async () => {
			try {
				const response = await axiosInstance.get(`/projects/${id}`)
				setProject(response.data)
			} catch (error) {
				setError(error.message) || setError(error.response.data.message)
			}
		}

		getProject()
	}, [id])

	return (
		<>
			<h1>Project: {project.title}</h1>
			{error && <ErrorMessage message={error} />}
			<section>
				<div className={styles.projectDetails}>
					<p>Created on: {formatFullDate(project.createdAt)}</p>
					<p>Last update on: {formatFullDate(project.updatedAt)}</p>
					<p>Status: {project.status}</p>
				</div>

				{isLoggedIn() && getUserRole() === 'admin' && (
					<Link
						to="/admin/projects/edit"
						state={{ id: project._id }}
					>
						Edit project
					</Link>
				)}
			</section>
		</>
	)
}

export default AdminViewProject
