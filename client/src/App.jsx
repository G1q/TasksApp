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
import Tasks from './pages/Tasks/Tasks'
import CreateTask from './pages/Tasks/CreateTask'
import ViewTask from './pages/Tasks/ViewTask'
import EditTask from './pages/Tasks/EditTask'

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
						<Route
							path="/tasks"
							element={<Tasks />}
						/>
						<Route
							path="/tasks/create"
							element={<CreateTask />}
						/>
						<Route
							path="/tasks/view/:id"
							element={<ViewTask />}
						/>
						<Route
							path="/tasks/edit"
							element={<EditTask />}
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
