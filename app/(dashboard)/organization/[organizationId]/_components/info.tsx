import { CreditCard } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import getOrg from '@/actions/get/getOrg'
import { cn } from '@/lib/utils'

interface InfoProps {
	isPro: boolean
	organizationId: string
}

export const Info = async ({
	isPro,
	organizationId,
}: InfoProps) => {
	const organization = await getOrg({
		orgId: organizationId,
	})

	return (
		<div className='flex items-center gap-x-4'>
			<div className='space-y-1'>
				<p className='font-semibold text-xl'>
					{organization[0]?.title}
				</p>
				<div className='flex items-center text-sm text-muted-foreground'>
					<CreditCard
						className={cn(
							'h-3 w-3 mr-1',
							isPro && 'text-[#efb810]'
						)}
					/>
					{isPro ? (
						<span className='text-[#efb810]'>Pro</span>
					) : (
						<span>Free</span>
					)}
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
