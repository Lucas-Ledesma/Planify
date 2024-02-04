import { Button } from '@/components/ui/button'
import { Org } from '@/type'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const OrgCard = ({ orgs }: { orgs: Org[] }) => {
	return (
		<div>
			{orgs.length > 0 ? (
				<article className='absolute justify-between flex-col p-10 bg-white inset-0 top-52 overflow-hidden mx-auto flex rounded-lg max-w-md max-h-80 shadow transition hover:shadow-lg'>
					<div>
						<h1 className=' font-bold text-2xl'>
							Select an organization
						</h1>
						<h2 className='text-neutral-400 text-sm'>
							to continue to Planify
						</h2>
					</div>
					<div className='flex flex-col gap-4 justify-between items-center'>
						{orgs.map((org) => {
							return (
								<Button
									className='w-full justify-between'
									variant={'outline'}
									asChild>
									<Link href={`/organization/${org?.id}`}>
										<h1 className='text-lg'>
											{org?.title}
										</h1>
										<ArrowRight className='size-6 text-neutral-400' />
									</Link>
								</Button>
							)
						})}
					</div>
					<div className='flex items-end gap-4'>
						<div className='border-t w-full h-1/2'></div>
						<span className='text-sm'>or</span>
						<div className='border-t w-full h-1/2'></div>
					</div>
					<Button asChild>
						<Link href={'/organization/form'}>
							Create an organization
						</Link>
					</Button>
				</article>
			) : (
				<article className='absolute justify-between flex-col p-10 bg-white inset-0 top-52 overflow-hidden mx-auto flex rounded-lg max-w-md max-h-52'>
					<div className='flex flex-col gap-2'>
						<h1 className=' font-bold text-2xl '>
							You need an organization
						</h1>
						<h2 className='text-neutral-400 text-sm'>
							to continue to Planify
						</h2>
					</div>
					<Button asChild>
						<Link href={'/organization/form'}>
							Create an organization
						</Link>
					</Button>
				</article>
			)}
		</div>
	)
}

export default OrgCard
