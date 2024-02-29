/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import styles from '../../styles/Projects.module.css'
import { Link } from 'react-router-dom'
import axiosInstance from '../../../config/axios.config'
import ErrorMessage from '../../../components/ErrorMessage'
import { useAuth } from '../../../contexts/AuthContext'
import NoPermissions from '../../../components/NoPermissions'

const AdminTasks = () => {
	const { isLoggedIn, getUserRole } = useAuth()
	const [tasks, setTasks] = useState([])
	const [error, setError] = useState(false)

	useEffect(() => {
		getTasks()
	}, [])

	const getTasks = async () => {
		try {
			const response = await axiosInstance.get('tasks')
			setTasks(response.data)
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
			<h1>Tasks</h1>
			{isLoggedIn() && getUserRole() === 'admin' ? (
				<section>
					{error && <ErrorMessage message={error} />}
					<table className={styles.dataTable}>
						<thead>
							<tr>
								<th>Title</th>
								<th>Project</th>
								<th>Created by</th>
								<th>Status</th>
								<th>Priority</th>
								<th>Category</th>
								<th>View</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((task) => (
								<tr key={task._id}>
									<td>{task.title}</td>
									<td>{task.project.title}</td>
									<td>{task.createdBy.username}</td>
									<td>{task.status}</td>
									<td>{task.priority}</td>
									<td>{task.category.title}</td>
									<td>
										<Link to={`./view/${task._id}`}>View</Link>
									</td>
									<td>
										<Link
											to="./edit"
											state={{ id: task._id }}
										>
											Edit
										</Link>
									</td>
									<td>
										<button onClick={() => deleteTask(task._id)}>&times;</button>
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

export default AdminTasks
