/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../../styles/Projects.module.css'
import { useEffect, useState } from 'react'
import axiosInstance from '../../../config/axios.config'
import ErrorMessage from '../../../components/ErrorMessage'
import { useAuth } from '../../../contexts/AuthContext'
import { TASK_PRIORITIES, TASK_STATUS } from '../../../data/status'

const AdminEditTask = () => {
	let { state } = useLocation()
	const { id } = state
	const { isLoggedIn, getUserRole } = useAuth()
	const [task, setTask] = useState({})
	const [categories, setCategories] = useState([])
	const [category, setCategory] = useState({})
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		getCategories()
		getTask()
	}, [id])

	const getTask = async () => {
		try {
			const response = await axiosInstance.get(`/tasks/${id}`)
			setTask(response.data)
			setCategory(response.data.category)
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	const getCategories = async () => {
		try {
			const response = await axiosInstance.get(`/categories`)
			setCategories(response.data)
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	const handleChanges = (e) => {
		setTask((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const saveChanges = async () => {
		try {
			await axiosInstance.put(`/tasks/${id}`, task)
			navigate('/admin/tasks')
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	return (
		<>
			<h1>Edit task: {task.title}</h1>
			{error && <ErrorMessage message={error} />}
			<section>
				<div className={styles.projectDetails}>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						value={task.title}
						onChange={handleChanges}
					/>

					<label htmlFor="status">Status:</label>
					<select
						name="status"
						id="status"
						value={task.status}
						onChange={handleChanges}
					>
						{TASK_STATUS.map((status) => (
							<option
								key={status}
								value={status}
							>
								{status}
							</option>
						))}
					</select>

					<label htmlFor="category">Category:</label>
					<select
						name="category"
						id="category"
						value={category._id}
						onChange={handleChanges}
					>
						{categories.map((category) => (
							<option
								key={category._id}
								value={category._id}
							>
								{category.title}
							</option>
						))}
					</select>

					<label htmlFor="priority">Priority:</label>
					<select
						name="priority"
						id="priority"
						value={task.priority}
						onChange={handleChanges}
					>
						{TASK_PRIORITIES.map((priority) => (
							<option
								key={priority}
								value={priority}
							>
								{priority}
							</option>
						))}
					</select>

					<label htmlFor="description">Description</label>
					<textarea
						name="description"
						id="description"
						cols="30"
						rows="5"
						value={task.description}
						onChange={handleChanges}
					></textarea>
				</div>
				{isLoggedIn() && getUserRole() === 'admin' && (
					<div>
						<button onClick={saveChanges}>Save changes</button>
						<button onClick={() => navigate('/admin/tasks')}>Cancel</button>
					</div>
				)}
			</section>
		</>
	)
}

export default AdminEditTask
