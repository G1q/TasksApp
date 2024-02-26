const express = require('express')
const router = express.Router()
const { createCategory, getCategories, deleteCategory, updateCategory } = require('../controllers/category.controller.js')

router.post('/', createCategory)

router.get('/', getCategories)

router.put('/:id', updateCategory)

router.delete('/:id', deleteCategory)

module.exports = router
