import { CreditCard } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import getOrgById from '@/actions/getOrgById'

interface InfoProps {
	isPro: boolean
	organizationId: string
}

export const Info = async ({
	isPro,
	organizationId,
}: InfoProps) => {
	const organization = await getOrgById(organizationId)

	return (
		<div className='flex items-center gap-x-4'>
			<div className='space-y-1'>
				<p className='font-semibold text-xl'>
					{organization?.title}
				</p>
				<div className='flex items-center text-xs text-muted-foreground'>
					<CreditCard className='h-3 w-3 mr-1' />
					{isPro ? 'Pro' : 'Free'}
				</div>
			</div>
		</div>
	)
}

Info.Skeleton = function SkeletonInfo() {
	return (
		<div className='flex items-center gap-x-4'>
			<div className='w-[60px] h-[60px] relative'>
				<Skeleton className='w-full h-full absolute' />
			</div>
			<div className='space-y-2'>
				<Skeleton className='h-10 w-[200px]' />
				<div className='flex items-center'>
					<Skeleton className='h-4 w-4 mr-2' />
					<Skeleton className='h-4 w-[100px]' />
				</div>
			</div>
		</div>
	)
}
