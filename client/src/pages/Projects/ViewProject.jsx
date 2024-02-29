/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from 'react-router-dom'
import styles from '../styles/Projects.module.css'
import { useEffect, useState } from 'react'
import axiosInstance from '../../config/axios.config'
import ErrorMessage from '../../components/ErrorMessage'
import { useAuth } from '../../contexts/AuthContext'
import { formatFullDate } from '../../utilities/formatDate'

const ViewProject = () => {
	const { id } = useParams()
	const { getUserId } = useAuth()
	const [project, setProject] = useState({})
	const [admin, setAdmin] = useState({})
	const [error, setError] = useState(false)

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

				{admin._id === getUserId() && (
					<Link
						to="/projects/edit"
						state={{ id: project._id }}
					>
						Edit project
					</Link>
				)}
			</section>
		</>
	)
}

export default ViewProject
