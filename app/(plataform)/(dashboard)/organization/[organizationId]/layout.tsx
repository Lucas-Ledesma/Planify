import Navbar from '../../_components/navbar'
import { Sidebar } from '../../_components/sidebar'

const DashboardLayout = ({
	children,
	params,
}: {
	children: React.ReactNode
	params: { organizationId: string }
}) => {
	return <main>{children}</main>
}

export default DashboardLayout
