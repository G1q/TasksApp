/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../styles/Tasks.module.css'
import { useEffect, useState } from 'react'
import axiosInstance from '../../config/axios.config'
import ErrorMessage from '../../components/ErrorMessage'
import { useAuth } from '../../contexts/AuthContext'
import { formatFullDate } from '../../utilities/formatDate'
import { PROJECT_STATUS } from '../../data/status'

const EditTask = () => {
	let { state } = useLocation()
	const { id } = state
	const { getUserId } = useAuth()
	const [project, setProject] = useState({})
	const [admin, setAdmin] = useState([])
	const [contributors, setContributors] = useState([])
	const [error, setError] = useState(false)

	const [userSuccess, setUserSuccess] = useState(false)
	const [userError, setUserError] = useState(false)
	const [users, setUsers] = useState([])
	const [user, setUser] = useState('')

	const navigate = useNavigate()

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

		const getUsers = async () => {
			try {
				const response = await axiosInstance.get(`/users`)
				setUsers(response.data)
			} catch (error) {
				setError(error.message) || setError(error.response.data.message)
			}
		}

		getUsers()
		getProject()
	}, [id])

	const addUsersToProject = () => {
		if (contributors.some((e) => e._id === user._id)) {
			setUserError('User allready in project!')
			setTimeout(() => {
				setUserError(false)
			}, 2000)
			return
		}

		setContributors((prev) => [...prev, user])

		setUserSuccess('User addded successfully to project!')
		setTimeout(() => {
			setUserSuccess(false)
			setUserError(false)
		}, 2000)
	}

	const removeUserFromProject = (id) => {
		setContributors(contributors.filter((_, index) => index !== id))
	}

	const handleChange = (e) => {
		setProject((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const saveChanges = async () => {
		try {
			await axiosInstance.put(`/projects/${id}`, { ...project, contributors: contributors.map((contributor) => contributor._id) })
			navigate('/projects')
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}
	}

	return (
		<>
			<h1>Edit project: {project.title}</h1>
			{error && <ErrorMessage message={error} />}
			<section>
				<div className={styles.projectDetails}>
					<p>Created on: {formatFullDate(project.createdAt)}</p>
					<p>Last update on: {formatFullDate(project.updatedAt)}</p>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						placeholder={project.title}
						onChange={handleChange}
					/>
					<label htmlFor="status">Status:</label>
					<select
						name="status"
						id="status"
						value={project.status}
						onChange={handleChange}
					>
						{PROJECT_STATUS.map((status) => (
							<option
								key={status}
								value={status}
							>
								{status}
							</option>
						))}
					</select>

					<p>Admin:</p>
					<ul className={styles.projectList}>
						{admin.map((adm) => (
							<li key={adm._id}>{adm.username}</li>
						))}
					</ul>

					<p>Contributors:</p>
					<div className={styles.formFlex}>
						<label htmlFor="user">Select users to contribute at this project: </label>
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
							onClick={addUsersToProject}
							disabled={!user}
						>
							Add user to project
						</button>
						{userSuccess && <p>{userSuccess}</p>}
						{userError && <ErrorMessage message={userError} />}
					</div>
					<ul className={styles.projectList}>
						{contributors.map((contributor, index) => (
							<li
								key={contributor._id}
								className={styles.usersListItem}
							>
								<span>{contributor.username}</span>
								<button
									type="button"
									onClick={() => removeUserFromProject(index)}
								>
									&times;
								</button>
							</li>
						))}
					</ul>
				</div>
				{admin.some((e) => e._id === getUserId()) && (
					<div>
						<button onClick={saveChanges}>Save changes</button>
						<button onClick={() => navigate('/projects')}>Cancel</button>
					</div>
				)}
			</section>
		</>
	)
}

export default EditTask
