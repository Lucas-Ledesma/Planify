'use client'

import { ActivityIcon } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import { ActivityItem } from '@/components/activity-item'
import { AuditLog, Card } from '@/type'
import getAuditLog from '@/actions/get/getAuditLog'
import { useQuery } from '@tanstack/react-query'

interface ActivityProps {
	card: Card
}

export const Activity = ({ card }: ActivityProps) => {
	const { data: items } = useQuery<AuditLog[]>({
		queryKey: ['card-logs', card.id],
		queryFn: () => getAuditLog({ cardId: card?.id }),
	})

	if (items === undefined) {
		return (
			<div className='flex items-start gap-x-3 w-full'>
				<Skeleton className='h-6 w-6 bg-neutral-800' />
				<div className='w-full'>
					<Skeleton className='w-24 h-6 mb-2 bg-neutral-800' />
					<Skeleton className='w-full h-10 bg-neutral-800' />
				</div>
			</div>
		)
	}

	return (
		<div className='flex items-start gap-x-3 w-full'>
			<ActivityIcon className='h-5 w-5 mt-0.5 ' />
			<div className='w-full'>
				<p className='font-semibold mb-2'>Activity</p>
				<ol className='mt-2 space-y-4'>
					{items.map((item) => (
						<ActivityItem key={item.id} data={item} />
					))}
				</ol>
			</div>
		</div>
	)
}

Activity.Skeleton = function ActivitySkeleton() {
	return (
		<div className='flex items-start gap-x-3 w-full'>
			<Skeleton className='h-6 w-6 bg-neutral-800' />
			<div className='w-full'>
				<Skeleton className='w-24 h-6 mb-2 bg-neutral-800' />
				<Skeleton className='w-full h-10 bg-neutral-800' />
			</div>
		</div>
	)
}
