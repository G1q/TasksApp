const Log = require('../models/log.model.js')

const createLog = async (req, res) => {
	const { user, project, task, description } = req.body
	try {
		const log = new Log({
			user,
			project,
			task,
			description,
		})

		await log.save()

		res.status(201).json({ message: 'Log created successfully!' })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const getTaskLogs = async (req, res) => {
	const { id } = req.params

	try {
		const logs = await Log.find({ task: id })

		res.status(200).json(logs)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const getLogs = async (req, res) => {
	try {
		const logs = await Log.find({})

		res.status(200).json(logs)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

module.exports = { createLog, getLogs, getTaskLogs }
