const mongoose = require('mongoose')

const projectSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		status: {
			type: String,
			required: true,
			default: 'New',
		},
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
)

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
