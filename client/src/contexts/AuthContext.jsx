import { createContext, useContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null)

	const isLoggedIn = () => {
		if (!authToken) {
			return false
		}

		const decodedToken = jwtDecode(authToken)
		const currentTime = Date.now() / 1000

		return decodedToken.exp > currentTime
	}

	const getUserRole = () => {
		if (!authToken) {
			return null
		}

		const decodedToken = jwtDecode(authToken)
		return decodedToken.userRole
	}

	const getUserId = () => {
		if (!authToken) {
			return null
		}

		const decodedToken = jwtDecode(authToken)
		return decodedToken.userId
	}

	const getUsername = () => {
		if (!authToken) return null

		const decodedToken = jwtDecode(authToken)
		return decodedToken.username
	}

	return <AuthContext.Provider value={{ authToken, setAuthToken, isLoggedIn, getUserRole, getUserId, getUsername }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	return useContext(AuthContext)
}
