import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const FullLayout = () => {
	return (
		<>
			<Header type="full" />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default FullLayout
