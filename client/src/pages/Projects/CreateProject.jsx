/* eslint-disable react-hooks/exhaustive-deps */
import styles from '../styles/Projects.module.css'
import InputGroup from '../../components/InputGroup'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../config/axios.config'
import ErrorMessage from '../../components/ErrorMessage'
import { useAuth } from '../../contexts/AuthContext'

const CreateProject = () => {
	const { getUserId } = useAuth()
	const [users, setUsers] = useState([])
	const [title, setTitle] = useState('')
	const [user, setUser] = useState('')
	const [contributors, setContributors] = useState([])
	const [userSuccess, setUserSuccess] = useState(false)
	const [userError, setUserError] = useState(false)
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axiosInstance.get(`/users`)
				setUsers(response.data)
				console.log(users)
			} catch (error) {
				setError(error.message) || setError(error.response.data.message)
			}
		}

		getUsers()
	}, [])

	const addUsersToProject = () => {
		if (contributors.includes(user)) {
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
		setContributors(contributors.filter((contributor, index) => index !== id))
	}

	const createProject = async (e) => {
		e.preventDefault()

		if (!title) return setError('Please provide a name for project!')

		try {
			await axiosInstance.post(`/projects`, { title, contributors, admin: getUserId() })
		} catch (error) {
			setError(error.message) || setError(error.response.data.message)
		}

		navigate('/projects')
	}

	return (
		<>
			<h1>Create new project</h1>
			{error && <ErrorMessage message={error} />}
			<section>
				<form className={styles.createForm}>
					<InputGroup
						label="Project title"
						selector="title"
						required
						onChange={(e) => setTitle(e.target.value)}
					/>

					<div className={styles.formFlex}>
						<label htmlFor="user">Select users to contribute at this project: </label>
						<select
							onChange={(e) => setUser(e.target.value)}
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

					{contributors.length > 0 && (
						<>
							<h2>Contributors:</h2>
							<ul className={styles.usersList}>
								{contributors.map((contributor, index) => (
									<li
										key={contributor}
										className={styles.usersListItem}
									>
										<span>{contributor}</span>
										<button
											type="button"
											onClick={() => removeUserFromProject(index)}
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
						onClick={createProject}
					>
						Create project
					</button>
				</form>
			</section>
		</>
	)
}

export default CreateProject
