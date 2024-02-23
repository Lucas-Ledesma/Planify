import Blob from '@/components/blob'

const AuthLayout = ({
	children,
}: {
	children: React.ReactNode
}) => {
	return (
		<div className='h-full w-full flex items-center justify-center'>
			<Blob />
			<main>{children}</main>
		</div>
	)
}

export default AuthLayout
