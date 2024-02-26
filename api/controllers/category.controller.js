const Category = require('../models/category.model.js')

const createCategory = async (req, res) => {
	try {
		const category = new Category({ title: req.body.title })

		await category.save()

		res.status(201).json({ message: 'Category created successfully!' })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const getCategories = async (req, res) => {
	try {
		const categories = await Category.find({})

		res.status(200).json(categories)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const updateCategory = async (req, res) => {
	const { id } = req.params
	const { title } = req.body

	try {
		const updatedCategory = await Category.findByIdAndUpdate(id, { title }, { new: true })

		res.status(200).json(updatedCategory)
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

const deleteCategory = async (req, res) => {
	try {
		const category = await Category.findByIdAndDelete(req.params.id)
		res.status(200).json({ message: 'Category deleted successfully!' })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

module.exports = { createCategory, getCategories, updateCategory, deleteCategory }
