import { Medal } from 'lucide-react'
import { cn } from '@/lib/utils'
import localFont from 'next/font/local'
import { Poppins } from 'next/font/google'

const headingFont = localFont({
	src: '../../public/fonts/font.woff2',
})

const textFont = Poppins({
	subsets: ['latin'],
	weight: [
		'100',
		'200',
		'300',
		'400',
		'500',
		'600',
		'700',
		'800',
		'900',
	],
})

const MarketingPage = async () => {
	return (
		<div className='flex items-center justify-center flex-col'>
			<div
				className={cn(
					'flex items-center justify-center flex-col',
					headingFont.className
				)}>
				<div className='mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase'>
					<Medal className='h-6 w-6 mr-2' />
					Best task managment
				</div>
				<h1 className='text-3xl md:text-6xl text-center text-white mb-6'>
					Planify gets the job done
				</h1>
				<div className='bg-primary-foreground  rounded-full text-center items-center'>
					<div className='gradient-text text-3xl animate-gradient md:text-6xl text-transparent px-4 p-2 rounded-md w-fit'>
						work efficient.
					</div>
				</div>
			</div>
			<div
				className={cn(
					'text-sm md:text-xl text-neutral-300 mt-4 max-w-xs md:max-w-2xl text-center mx-auto',
					textFont.className
				)}>
				Collaborate, manage projects, and reach new
				productivity peaks. From high rises to the home
				office, the way your team works is unique -
				accomplish it all with Planify.
			</div>
		</div>
	)
}

export default MarketingPage
