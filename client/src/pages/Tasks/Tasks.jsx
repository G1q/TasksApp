/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import styles from '../styles/Tasks.module.css'
import { Link } from 'react-router-dom'
import axiosInstance from '../../config/axios.config'
import ErrorMessage from '../../components/ErrorMessage'
import { useAuth } from '../../contexts/AuthContext'

const Tasks = () => {
	const { getUserId } = useAuth()
	const [tasks, setTasks] = useState([])
	const [error, setError] = useState(false)

	useEffect(() => {
		getTasks()
	}, [])

	const getTasks = async () => {
		try {
			const response = await axiosInstance.get(`/tasks/user/${getUserId()}`)
			setTasks(response.data)
			console.log(tasks)
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	const deleteTask = async (id) => {
		try {
			await axiosInstance.delete(`/tasks/${id}`)
			getTasks()
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	return (
		<>
			<h1>My Tasks</h1>
			<section>
				<div className={styles.actionsBar}>
					<Link to="./create">Create new task</Link>
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
						{tasks.map((project) => (
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
											state={{ id: project._id }}
										>
											Edit
										</Link>
									)}
								</td>
								<td>{project.admin.includes(getUserId()) && <button onClick={() => deleteTask(project._id)}>&times;</button>}</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</>
	)
}

export default Tasks
