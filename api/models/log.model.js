const mongoose = require('mongoose')

const logSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		project: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
		},
		task: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Task',
		},
		description: {
			type: String,
		},
	},
	{ timestamps: true }
)

const Log = mongoose.model('Log', logSchema)

module.exports = Log
