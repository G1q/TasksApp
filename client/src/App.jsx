import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FullLayout from './layouts/FullLayout'
import SimpleLayout from './layouts/SimpleLayout'
import Register from './pages/Register'
import Login from './pages/Login'
import { AuthProvider } from './contexts/AuthContext'
import Projects from './pages/Projects/Projects'
import CreateProject from './pages/Projects/CreateProject'
import ViewProject from './pages/Projects/ViewProject'
import EditProject from './pages/Projects/EditProject'

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<FullLayout />}
					>
						<Route
							index
							element={<h1>Homepage</h1>}
						/>
						<Route
							path="/projects"
							element={<Projects />}
						/>
						<Route
							path="/projects/create"
							element={<CreateProject />}
						/>
						<Route
							path="/projects/view/:id"
							element={<ViewProject />}
						/>
						<Route
							path="/projects/edit"
							element={<EditProject />}
						/>
					</Route>
					<Route
						path="/"
						element={<SimpleLayout />}
					>
						<Route
							path="/register"
							element={<Register />}
						/>
						<Route
							path="/login"
							element={<Login />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
