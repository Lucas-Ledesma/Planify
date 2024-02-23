import { Navbar } from '@/app/(marketing)/_components/navbar'
import Blob from '@/components/blob'

const MarketingLayout = ({
	children,
}: {
	children: React.ReactNode
}) => {
	return (
		<div className='h-full w-full relative '>
			<Blob />
			<Navbar />
			<main className='pt-40 pb-20 z-10'>{children}</main>
		</div>
	)
}

export default MarketingLayout
