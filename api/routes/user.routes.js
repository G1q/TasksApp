const express = require('express')
const router = express.Router()
const { createUser, getUsers, deleteUser, getUser, updateUser } = require('../controllers/user.controller.js')

router.post('/', createUser)

router.get('/', getUsers)
router.get('/:id', getUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

module.exports = router
