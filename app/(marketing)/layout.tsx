import { Footer } from '@/app/(marketing)/_components/footer'
import { Navbar } from '@/app/(marketing)/_components/navbar'

const MarketingLayout = ({
	children,
}: {
	children: React.ReactNode
}) => {
	return (
		<div className='h-full '>
			<Navbar />
			<div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
				<div className='absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]'></div>
			</div>
			<main className='pt-40 pb-20 '>{children}</main>
			<Footer />
		</div>
	)
}

export default MarketingLayout
