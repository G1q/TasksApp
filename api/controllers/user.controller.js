const bcrypt = require('bcrypt')
const User = require('../models/user.model.js')
const Task = require('../models/task.model.js')
const Project = require('../models/project.model.js')

const createUser = async (req, res) => {
	try {
		const { username, email, password, role } = req.body

		// Check if the username and email are already taken
		const existingUsername = await User.findOne({ username })
		const existingEmail = await User.findOne({ email })

		if (existingUsername) return res.status(400).json({ message: 'This user is allready taken!' })

		if (existingEmail) return res.status(400).json({ message: 'This email is allready taken!' })

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10)

		// Create a new user
		const user = new User({
			username,
			email,
			password: hashedPassword,
			role,
		})

		await user.save()

		res.status(201).json({ message: 'User registered successfully!' })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const getUsers = async (req, res) => {
	try {
		const users = await User.find({}).select('-password')

		res.status(200).json(users)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const getUser = async (req, res) => {
	const { id } = req.params

	try {
		const user = await User.findById(id).select('-password')

		res.status(200).json(user)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const updateUser = async (req, res) => {
	const { id } = req.params
	const { username, email, password, role, active } = req.body
	let hashedPassword = password

	try {
		const user = await User.findById(id)

		// Check if it's another user with the same email, but continue if the new email is same with user email
		const existingEmail = await User.findOne({ email })
		if (existingEmail && user.email !== email) return res.status(400).json({ message: 'This email is allready taken by another user!' })

		// Check if it's another user with the same username, but continue if the new username is same with user username
		const existingUsername = await User.findOne({ username })
		if (existingUsername && user.username !== username) return res.status(400).json({ message: 'This username is allready taken!' })

		// Check if password is changed
		if (password) hashedPassword = await bcrypt.hash(password, 10)

		const updatedUser = await User.findByIdAndUpdate(id, { username, email, role, active, password: hashedPassword }, { new: true })

		res.status(200).json(updatedUser)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const deleteUser = async (req, res) => {
	const { id } = req.params

	const tasks = await Task.countDocuments({ createdBy: id })
	if (tasks > 0) return res.status(403).json({ message: "You can't delete this user because have active tasks!" })

	const projects = await Project.countDocuments({ admin: id })
	if (projects > 0) return res.status(403).json({ message: "You can't delete this user because have active projects!" })

	try {
		const user = await User.findByIdAndDelete(id)
		res.status(200).json({ message: 'User deleted successfully!' })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser }
