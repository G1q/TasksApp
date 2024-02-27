const express = require('express')
const router = express.Router()
const { createProject, getProjects, deleteProject, getProject, updateProject, getUserProjects } = require('../controllers/project.controller.js')

router.post('/', createProject)

router.get('/', getProjects)
router.get('/:id', getProject)
router.get('/user/:id', getUserProjects)

router.put('/:id', updateProject)

router.delete('/:id', deleteProject)

module.exports = router
