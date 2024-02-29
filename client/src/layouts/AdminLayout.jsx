import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const AdminLayout = () => {
	return (
		<>
			<Header
				type="full"
				role="admin"
			/>
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default AdminLayout
