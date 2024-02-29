const Task = require('../models/task.model.js')

const createTask = async (req, res) => {
	try {
		const task = new Task({ ...req.body })

		await task.save()

		res.status(201).json({ message: 'Task created successfully!' })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({}).populate('project category createdBy', 'title username')

		res.status(200).json(tasks)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const getTask = async (req, res) => {
	const { id } = req.params

	try {
		const task = await Task.findById(id).populate('project category', 'title')

		res.status(200).json(task)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const getUserTasks = async (req, res) => {
	const { id } = req.params

	try {
		const tasks = await Task.find({ createdBy: id }).populate('project category', 'title')

		res.status(200).json(tasks)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const updateTask = async (req, res) => {
	const { id } = req.params

	try {
		const updatedTask = await Task.findByIdAndUpdate(id, { ...req.body }, { new: true })

		res.status(200).json(updatedTask)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const deleteTask = async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id)
		res.status(200).json({ message: 'Task deleted successfully!' })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask, getUserTasks }
