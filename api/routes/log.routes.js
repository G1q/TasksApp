const express = require('express')
const router = express.Router()
const { createLog, getLogs, getTaskLogs } = require('../controllers/log.controller.js')

router.post('/', createLog)

router.get('/', getLogs)
router.get('/:id', getTaskLogs)

module.exports = router
