/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from 'react-router-dom'
import styles from '../styles/Tasks.module.css'
import { useEffect, useState } from 'react'
import axiosInstance from '../../config/axios.config'
import ErrorMessage from '../../components/ErrorMessage'
import { useAuth } from '../../contexts/AuthContext'
import { formatFullDate } from '../../utilities/formatDate'

const ViewTask = () => {
	const { id } = useParams()
	const { getUserId } = useAuth()
	const [project, setProject] = useState({})
	const [admin, setAdmin] = useState([])
	const [contributors, setContributors] = useState([])
	const [error, setError] = useState(false)

	useEffect(() => {
		const getProject = async () => {
			try {
				const response = await axiosInstance.get(`/projects/${id}`)
				setProject(response.data)
				setAdmin(response.data.admin)
				setContributors(response.data.contributors)
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

					<p>Admin:</p>
					<ul className={styles.projectList}>
						{admin.map((adm) => (
							<li key={adm._id}>{adm.username}</li>
						))}
					</ul>

					<p>Contributors:</p>
					<ul className={styles.projectList}>
						{contributors.map((contributor) => (
							<li key={contributor._id}>{contributor.username}</li>
						))}
					</ul>
				</div>
				{admin.some((e) => e._id === getUserId()) && (
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

export default ViewTask
