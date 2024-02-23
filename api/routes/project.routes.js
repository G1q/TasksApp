const express = require('express')
const router = express.Router()
const { createProject, getProjects, deleteProject, getProject, updateProject } = require('../controllers/project.controller.js')

router.post('/', createProject)

router.get('/', getProjects)
router.get('/:id', getProject)

router.put('/:id', updateProject)

router.delete('/:id', deleteProject)

module.exports = router
