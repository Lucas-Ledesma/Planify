import Navbar from './_components/navbar'

const OrganizationIdLayout = ({
	children,
}: {
	children: React.ReactNode
}) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	)
}

export default OrganizationIdLayout
