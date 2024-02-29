/* eslint-disable react-hooks/exhaustive-deps */
import styles from '../styles/Tasks.module.css'
import InputGroup from '../../components/InputGroup'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../config/axios.config'
import ErrorMessage from '../../components/ErrorMessage'
import { useAuth } from '../../contexts/AuthContext'
import { TASK_CATEGORIES, TASK_PRIORITIES } from '../../data/status'

const CreateTask = () => {
	const { getUserId } = useAuth()
	const [users, setUsers] = useState([])
	const [title, setTitle] = useState('')
	const [priority, setPriority] = useState('')
	const [category, setCategory] = useState('')
	const [deadline, setDeadline] = useState(false)
	const [selectedProject, setSelectedProject] = useState('')
	const [user, setUser] = useState('')
	const [contributors, setContributors] = useState([])
	const [userSuccess, setUserSuccess] = useState(false)
	const [userError, setUserError] = useState(false)
	const [error, setError] = useState(false)
	const [projects, setProjects] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axiosInstance.get(`/users`)
				setUsers(response.data)
			} catch (error) {
				setError(error.message) || setError(error.response.data.message)
			}
		}

		const getProjects = async () => {
			try {
				const response = await axiosInstance.get(`/projects/user/${getUserId()}`)
				setProjects(response.data)
			} catch (error) {
				setError(error.message) || setError(error.response.data.message)
			}
		}

		getProjects()
		getUsers()
	}, [])

	const addUsersToTask = () => {
		if (contributors.some((e) => e._id === user._id)) {
			setUserError('User allready in this task!')
			setTimeout(() => {
				setUserError(false)
			}, 2000)
			return
		}
		setContributors((prev) => [...prev, user])

		setUserSuccess('User addded successfully to this task!')
		setTimeout(() => {
			setUserSuccess(false)
			setUserError(false)
		}, 2000)
	}

	const removeUserFromTask = (id) => {
		setContributors(contributors.filter((_, index) => index !== id))
	}

	const createTask = async (e) => {
		e.preventDefault()

		if (!title) return setError('Please provide a name for task!')

		try {
			const task = {
				title,
				category,
				priority,
				deadline,
				project: selectedProject,
				assignedTo: contributors.map((contributor) => contributor._id),
				createdBy: getUserId(),
			}
			console.log(task)

			await axiosInstance.post(`/tasks`, task)
		} catch (error) {
			console.log(error)
			setError(error.message) || setError(error.response.data.message)
		}

		//TODO:
		// navigate('/tasks')
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
						onChange={(e) => setTitle(e.target.value)}
					/>

					<div className={styles.formFlex}>
						<div className={styles.formFlex}>
							<label htmlFor="project">Project:</label>
							<select
								name="project"
								id="project"
								defaultValue=""
								onChange={(e) => setSelectedProject(e.target.value)}
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
								onChange={(e) => setCategory(e.target.value)}
							>
								<option
									value=""
									hidden
								>
									Choose category
								</option>
								{TASK_CATEGORIES.map((category) => (
									<option
										key={category}
										value={category}
									>
										{category}
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
								onChange={(e) => setPriority(e.target.value)}
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

						<div>
							<label htmlFor="deadline">Deadline:</label>
							<input
								type="date"
								name="deadline"
								id="deadline"
								onChange={(e) => setDeadline(e.target.value)}
							/>
						</div>
					</div>

					<div className={styles.formFlex}>
						<label htmlFor="user">Select users to assign this task: </label>
						<select
							onChange={(e) => setUser({ _id: e.target.value, username: e.target.selectedOptions[0].textContent })}
							defaultValue=""
							id="user"
							name="user"
						>
							<option
								value=""
								hidden
							>
								Choose users
							</option>
							{users.map((user) => (
								<option
									key={user._id}
									value={user._id}
								>
									{user.username}
								</option>
							))}
						</select>
						<button
							type="button"
							onClick={addUsersToTask}
							disabled={!user}
						>
							Add user to task
						</button>
						{userSuccess && <p>{userSuccess}</p>}
						{userError && <ErrorMessage message={userError} />}
					</div>

					{contributors.length > 0 && (
						<>
							<h2>Contributors:</h2>
							<ul className={styles.usersList}>
								{contributors.map((contributor, index) => (
									<li
										key={contributor._id}
										className={styles.usersListItem}
									>
										<span>{contributor.username}</span>
										<button
											type="button"
											onClick={() => removeUserFromTask(index)}
										>
											&times;
										</button>
									</li>
								))}
							</ul>
						</>
					)}

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
