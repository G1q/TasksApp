const Task = require('../models/task.model.js')

const createTask = async (req, res) => {
	const { title, deadline, project, priority, category, createdBy, assignedTo } = req.body
	try {
		const task = new Task({
			title,
			deadline,
			project,
			priority,
			category,
			createdBy,
			assignedTo,
		})

		await task.save()

		res.status(201).json({ message: 'Task created successfully!' })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({})

		res.status(200).json(tasks)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const getTask = async (req, res) => {
	const { id } = req.params

	try {
		const task = await Task.findById(id)

		res.status(200).json(task)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const updateTask = async (req, res) => {
	const { id } = req.params
	const { title, deadline, project, priority, category, createdBy, assignedTo, status } = req.body

	try {
		const updatedTask = await Task.findByIdAndUpdate(id, { title, deadline, project, priority, category, createdBy, assignedTo, status }, { new: true })

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

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask }
