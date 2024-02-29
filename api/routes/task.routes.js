const express = require('express')
const router = express.Router()
const { createTask, getTasks, deleteTask, getTask, updateTask, getUserTasks } = require('../controllers/task.controller.js')

router.post('/', createTask)

router.get('/', getTasks)
router.get('/:id', getTask)
router.get('/user/:id', getUserTasks)

router.put('/:id', updateTask)

router.delete('/:id', deleteTask)

module.exports = router
