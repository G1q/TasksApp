const express = require('express')
const router = express.Router()
const { createLog, getLogs } = require('../controllers/log.controller.js')

router.post('/', createLog)

router.get('/', getLogs)

module.exports = router
