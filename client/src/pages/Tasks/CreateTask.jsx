/* eslint-disable react-hooks/exhaustive-deps */
import styles from '../styles/Tasks.module.css'
import InputGroup from '../../components/InputGroup'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../config/axios.config'
import ErrorMessage from '../../components/ErrorMessage'
import { useAuth } from '../../contexts/AuthContext'
import { TASK_PRIORITIES } from '../../data/status'

const CreateTask = () => {
	const { getUserId } = useAuth()
	const [error, setError] = useState(false)
	const [projects, setProjects] = useState([])
	const [categories, setCategories] = useState([])
	const [task, setTask] = useState({})

	const navigate = useNavigate()

	useEffect(() => {
		const getProjects = async () => {
			try {
				const response = await axiosInstance.get(`/projects/user/${getUserId()}`)
				setProjects(response.data)
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

		getCategories()
		getProjects()
	}, [])

	const handleChanges = (e) => {
		setTask((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const createTask = async (e) => {
		e.preventDefault()

		if (!task.title) return setError('Please provide a name for task!')

		try {
			await axiosInstance.post(`/tasks`, { ...task, createdBy: getUserId() })
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}

		navigate('/tasks')
	}

	return (
		<>
			<h1>Create new task</h1>
			{error && <ErrorMessage message={error} />}
			<section>
				<form className={styles.createForm}>
					<InputGroup
						label="Task title"
						selector="title"
						required
						onChange={handleChanges}
					/>

					<div className={styles.formFlex}>
						<div className={styles.formFlex}>
							<label htmlFor="project">Project:</label>
							<select
								name="project"
								id="project"
								defaultValue=""
								onChange={handleChanges}
							>
								<option
									value=""
									hidden
								>
									Choose project
								</option>
								{projects.map((project) => (
									<option
										key={project._id}
										value={project._id}
									>
										{project.title}
									</option>
								))}
							</select>
						</div>

						<div className={styles.formFlex}>
							<label htmlFor="category">Category:</label>
							<select
								name="category"
								id="category"
								defaultValue=""
								onChange={handleChanges}
							>
								<option
									value=""
									hidden
								>
									Choose category
								</option>
								{categories.map((category) => (
									<option
										key={category._id}
										value={category._id}
									>
										{category.title}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className={styles.formFlex}>
						<div className={styles.formFlex}>
							<label htmlFor="priority">Priority:</label>
							<select
								name="priority"
								id="priority"
								defaultValue=""
								onChange={handleChanges}
							>
								<option
									value=""
									hidden
								>
									Choose priority
								</option>
								{TASK_PRIORITIES.map((priority) => (
									<option
										key={priority}
										value={priority}
									>
										{priority}
									</option>
								))}
							</select>
						</div>
					</div>

					<div>
						<label htmlFor="description">Description:</label>
						<textarea
							name="description"
							id="description"
							cols="30"
							rows="3"
							onChange={handleChanges}
						></textarea>
					</div>

					<button
						type="button"
						onClick={createTask}
					>
						Create task
					</button>
				</form>
			</section>
		</>
	)
}

export default CreateTask
