const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')

const login = async (req, res) => {
	const { email, password } = req.body

	try {
		// Check if the user exists
		const user = await User.findOne({ email })
		if (!user) return res.status(404).json({ message: 'No user with this email!' })

		// Check if user is active
		if (!user.active) return res.status(403).json({ message: 'This user is not active!' })

		// Compare passwords
		const passwordMatch = await bcrypt.compare(password, user.password)
		if (!passwordMatch) return res.status(401).json({ message: 'Email or password is wrong!' })

		// Generate a JWT token
		const token = jwt.sign({ id: user._id, role: user.role, username: user.username }, process.env.JWT_SECRET, {
			expiresIn: '4h',
		})

		res.status(200).json({ token })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

module.exports = { login }
