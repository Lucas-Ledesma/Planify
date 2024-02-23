import { Button } from '@/components/ui/button'
import { Org } from '@/type'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const SkeletonButton = () => {
	return (
		<div className='bg-neutral-800 animate-pulse rounded-lg w-full h-12 flex justify-between items-center px-4'>
			<div className='w-3/4 h-full flex items-center'>
				<div className='h-5 w-24 bg-neutral-600 rounded-lg'></div>
			</div>
			<div className='w-1/4 h-full flex justify-end items-center'>
				<div className='h-5 w-5 bg-neutral-600 rounded-lg'></div>
			</div>
		</div>
	)
}

interface OrgCardProps {
	orgs: Org[]
	isLoading: boolean
}

const OrgCard = ({ orgs, isLoading }: OrgCardProps) => {
	return (
		<article className='justify-between absolute h-fit gap-4 flex-col p-10 border-2 bg-primary-foreground inset-0 top-52 overflow-hidden mx-auto flex rounded-lg max-w-md  shadow transition hover:shadow-lg'>
			<div>
				{orgs.length === 0 ? (
					<h1 className=' font-bold text-2xl'>
						You need an organization
					</h1>
				) : (
					<h1 className=' font-bold text-2xl'>
						Select an organization
					</h1>
				)}

				<h2 className='text-neutral-400 text-sm'>
					to continue to Planify
				</h2>
			</div>
			<div className='flex flex-col gap-4 justify-between items-center'>
				{isLoading
					? [1, 2, 3].map((index) => (
							<SkeletonButton key={index} />
					  ))
					: orgs.map((org) => (
							<Button
								key={org.id}
								className='w-full justify-between'
								variant={'ghost'}
								asChild>
								<Link href={`/organization/${org?.id}`}>
									<h1 className='text-lg'>{org?.title}</h1>
									<ArrowRight className='size-6' />
								</Link>
							</Button>
					  ))}
			</div>
			<div className='flex items-end gap-4'>
				<div className='border-t w-full h-1/2'></div>
				<span className='text-sm'>or</span>
				<div className='border-t w-full h-1/2'></div>
			</div>
			<Button variant={'outline'} asChild>
				<Link href={'/organization/form'}>
					Create an organization
				</Link>
			</Button>
		</article>
	)
}

export default OrgCard
