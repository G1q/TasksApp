import { useEffect, useState } from 'react'
import styles from '../styles/Projects.module.css'
import { Link } from 'react-router-dom'
import axiosInstance from '../../config/axios.config'
import ErrorMessage from '../../components/ErrorMessage'
import { useAuth } from '../../contexts/AuthContext'

const Projects = () => {
	const { getUserId } = useAuth()
	const [projects, setProjects] = useState([])
	const [error, setError] = useState(false)

	useEffect(() => {
		const getProjects = async () => {
			try {
				const response = await axiosInstance.get(`/projects/user/${getUserId()}`)
				setProjects(response.data)
				console.log(projects)
			} catch (error) {
				setError(error.message) || setError(error.response.data.message)
			}
		}

		getProjects()
	}, [])

	const deleteProject = async (id) => {
		try {
			await axiosInstance.delete(`/projects/${id}`)
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	return (
		<>
			<h1>My Projects</h1>
			<section>
				<div className={styles.actionsBar}>
					<Link to="./create">Create new project</Link>
				</div>
				{error && <ErrorMessage message={error} />}
				<table className={styles.dataTable}>
					<thead>
						<tr>
							<th>Title</th>
							<th>My role</th>
							<th>Status</th>
							<th>View</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{projects.map((project) => (
							<tr key={project._id}>
								<td>{project.title}</td>
								<td>{project.admin.includes(getUserId()) ? 'Admin' : 'Contributor'}</td>
								<td>{project.status}</td>
								<td>
									<Link to={`./view/${project._id}`}>View</Link>
								</td>
								<td>
									{project.admin.includes(getUserId()) && (
										<Link
											to="./edit"
											state={project._id}
										>
											Edit
										</Link>
									)}
								</td>
								<td>{project.admin.includes(getUserId()) && <button onClick={() => deleteProject(project._id)}>&times;</button>}</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</>
	)
}

export default Projects
