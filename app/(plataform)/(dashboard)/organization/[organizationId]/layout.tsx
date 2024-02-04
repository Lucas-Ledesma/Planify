import Navbar from '../../_components/navbar'

const DashboardLayout = ({
	children,
	params,
}: {
	children: React.ReactNode
	params: { organizationId: String }
}) => {
	return (
		<div className='h-full'>
			<Navbar organizationId={params.organizationId} />
			{children}
		</div>
	)
}

export default DashboardLayout
