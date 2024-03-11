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
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	const deleteTask = async (id) => {
		const confirm = window.confirm('Are you sure you want to delete this task?')

		if (confirm) {
			try {
				await axiosInstance.delete(`/tasks/${id}`)
				getTasks()
			} catch (error) {
				setError(error.message) || setError(error.response.data.message)
			}
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
							<th>Project</th>
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
							<tr
								key={task._id}
								data-status={task.status.toLowerCase().replaceAll(' ', '-')}
							>
								<td>{task.title}</td>
								<td>{task.project.title}</td>
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
									<button
										className={styles.deleteButton}
										onClick={() => deleteTask(task._id)}
									>
										&times;
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</>
	)
}

export default Tasks
