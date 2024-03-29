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
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminProjects from './pages/Admin/Projects/AdminProjects'
import AdminViewProject from './pages/Admin/Projects/AdminViewProject'
import AdminEditProject from './pages/Admin/Projects/AdminEditProject'
import AdminTasks from './pages/Admin/Tasks/AdminTasks'
import AdminEditTask from './pages/Admin/Tasks/AdminEditTask'
import AdminViewTask from './pages/Admin/Tasks/AdminViewTask'
import AdminCategories from './pages/Admin/Categories/AdminCategories'
import AdminEditCategory from './pages/Admin/Categories/AdminEditCategory'
import AdminCreateCategory from './pages/Admin/Categories/AdminCreateCategory'
import AdminUsers from './pages/Admin/Users/AdminUsers'
import AdminViewUser from './pages/Admin/Users/AdminViewUser'
import AdminEditUser from './pages/Admin/Users/AdminEditUser'
import AdminCreateUser from './pages/Admin/Users/AdminCreateUser'

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
						path="/admin"
						element={<AdminLayout />}
					>
						<Route
							index
							element={<AdminDashboard />}
						/>
						<Route
							path="/admin/users"
							element={<AdminUsers />}
						/>
						<Route
							path="/admin/users/view/:id"
							element={<AdminViewUser />}
						/>
						<Route
							path="/admin/users/edit"
							element={<AdminEditUser />}
						/>
						<Route
							path="/admin/users/create"
							element={<AdminCreateUser />}
						/>
						<Route
							path="/admin/projects"
							element={<AdminProjects />}
						/>
						<Route
							path="/admin/projects/view/:id"
							element={<AdminViewProject />}
						/>
						<Route
							path="/admin/projects/edit"
							element={<AdminEditProject />}
						/>
						<Route
							path="/admin/tasks"
							element={<AdminTasks />}
						/>
						<Route
							path="/admin/tasks/view/:id"
							element={<AdminViewTask />}
						/>
						<Route
							path="/admin/tasks/edit"
							element={<AdminEditTask />}
						/>
						<Route
							path="/admin/categories/"
							element={<AdminCategories />}
						/>
						<Route
							path="/admin/categories/create"
							element={<AdminCreateCategory />}
						/>
						<Route
							path="/admin/categories/edit"
							element={<AdminEditCategory />}
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
