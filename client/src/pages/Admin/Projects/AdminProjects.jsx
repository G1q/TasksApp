/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import styles from '../../styles/Projects.module.css'
import { Link } from 'react-router-dom'
import axiosInstance from '../../../config/axios.config'
import ErrorMessage from '../../../components/ErrorMessage'
import { useAuth } from '../../../contexts/AuthContext'
import NoPermissions from '../../../components/NoPermissions'

const AdminProjects = () => {
	const { isLoggedIn, getUserRole } = useAuth()
	const [projects, setProjects] = useState([])
	const [error, setError] = useState(false)

	useEffect(() => {
		getProjects()
		console.log(projects)
	}, [])

	const getProjects = async () => {
		try {
			const response = await axiosInstance.get('projects')
			setProjects(response.data)
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	const deleteProject = async (id) => {
		try {
			await axiosInstance.delete(`/projects/${id}`)
			getProjects()
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	return (
		<>
			<h1>Projects</h1>
			{isLoggedIn() && getUserRole() === 'admin' ? (
				<section>
					{error && <ErrorMessage message={error} />}
					<table className={styles.dataTable}>
						<thead>
							<tr>
								<th>Title</th>
								<th>Admin</th>
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
									<td>{project.admin.username}</td>
									<td>{project.status}</td>
									<td>
										<Link to={`./view/${project._id}`}>View</Link>
									</td>
									<td>
										<Link
											to="./edit"
											state={{ id: project._id }}
										>
											Edit
										</Link>
									</td>
									<td>
										<button onClick={() => deleteProject(project._id)}>&times;</button>
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

export default AdminProjects
