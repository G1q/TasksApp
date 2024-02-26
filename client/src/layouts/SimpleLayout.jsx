import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'

const SimpleLayout = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	)
}

export default SimpleLayout
