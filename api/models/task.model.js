const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
			default: 'New',
		},
		deadline: {
			type: String,
		},
		project: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
			required: true,
		},
		priority: {
			type: String,
			default: 'No priority',
		},
		category: {
			// type: mongoose.Schema.Types.ObjectId,
			type: String,
			ref: 'Category',
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		assignedTo: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'User',
		},
	},
	{ timestamps: true }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
