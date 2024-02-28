const Project = require('../models/project.model.js')

const createProject = async (req, res) => {
	try {
		const project = new Project({
			title: req.body.title,
			admin: req.body.admin,
			contributors: req.body.contributors,
		})

		await project.save()

		res.status(201).json({ message: 'Project created successfully!' })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const getProjects = async (req, res) => {
	try {
		const projects = await Project.find({})

		res.status(200).json(projects)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const getUserProjects = async (req, res) => {
	const { id } = req.params

	try {
		const projects = await Project.find({ $or: [{ admin: id }, { contributors: id }] })

		res.status(200).json(projects)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const getProject = async (req, res) => {
	const { id } = req.params

	try {
		const project = await Project.findById(id).populate('admin contributors', 'username')
		res.status(200).json(project)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const updateProject = async (req, res) => {
	const { id } = req.params
	const { title, status, contributors } = req.body

	try {
		const updatedProject = await Project.findByIdAndUpdate(id, { title, status, contributors }, { new: true })

		res.status(200).json(updatedProject)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const deleteProject = async (req, res) => {
	try {
		const project = await Project.findByIdAndDelete(req.params.id)
		res.status(200).json({ message: 'Project deleted successfully!' })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

module.exports = { createProject, getProjects, getProject, updateProject, deleteProject, getUserProjects }
