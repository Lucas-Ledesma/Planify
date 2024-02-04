import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'
import Image from 'next/image'

const font = Poppins({
	subsets: ['latin'],
	weight: ['600'],
})

interface HeaderProps {
	label: string
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<div className='w-full flex flex-col gap-y-4 items-center justify-center'>
			<h1
				className={cn(
					'text-3xl font-semibold flex gap-2 items-end ',
					font.className
				)}>
				<Image
					src='/logo.svg'
					alt='Logo'
					height={40}
					width={40}
				/>
				Planify
			</h1>
			<p className='text-muted-foreground text-sm'>
				{label}
			</p>
		</div>
	)
}
