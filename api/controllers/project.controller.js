const Project = require('../models/project.model.js')
const Task = require('../models/task.model.js')

const createProject = async (req, res) => {
	try {
		const project = new Project({
			title: req.body.title,
			admin: req.body.admin,
		})

		await project.save()

		res.status(201).json({ message: 'Project created successfully!' })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const getProjects = async (req, res) => {
	try {
		const projects = await Project.find({}).populate('admin', 'username')

		res.status(200).json(projects)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const getUserProjects = async (req, res) => {
	const { id } = req.params

	try {
		const projects = await Project.find({ admin: id })

		res.status(200).json(projects)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const getProject = async (req, res) => {
	const { id } = req.params

	try {
		const project = await Project.findById(id)
		res.status(200).json(project)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const updateProject = async (req, res) => {
	const { id } = req.params
	const { title, status } = req.body

	try {
		const updatedProject = await Project.findByIdAndUpdate(id, { title, status }, { new: true })

		res.status(200).json(updatedProject)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const deleteProject = async (req, res) => {
	const { id } = req.params
	const tasks = await Task.countDocuments({ project: id })

	if (tasks > 0) return res.status(403).json({ message: "You can't delete this project because have active tasks on it!" })

	try {
		const project = await Project.findByIdAndDelete(id)
		res.status(200).json({ message: 'Project deleted successfully!' })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

module.exports = { createProject, getProjects, getProject, updateProject, deleteProject, getUserProjects }
