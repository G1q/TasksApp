require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('Connected to MongoDB'))
	.catch((error) => console.error('MongoDB connection error:', error))

// Routes
const userRoutes = require('./routes/user.routes.js')
const authRoutes = require('./routes/auth.routes.js')
const projectRoutes = require('./routes/project.routes.js')
const taskRoutes = require('./routes/task.routes.js')
const categoryRoutes = require('./routes/category.routes.js')
const logRoutes = require('./routes/log.routes.js')

// Middlewares
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/projects', projectRoutes)
app.use('/api/v1/tasks', taskRoutes)
app.use('/api/v1/categories', categoryRoutes)
app.use('/api/v1/logs', logRoutes)

// Start the server
app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`)
})
