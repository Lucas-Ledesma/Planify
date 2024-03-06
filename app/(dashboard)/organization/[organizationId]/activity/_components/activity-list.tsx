import getAuditLog from '@/actions/get/getAuditLog'
import { ActivityItem } from '@/components/activity-item'
import { Skeleton } from '@/components/ui/skeleton'

interface ActivityListProps {
	organizationId: string
}

const ActivityList = async ({
	organizationId,
}: ActivityListProps) => {
	const auditLog = await getAuditLog({
		orgId: organizationId,
		size: '20',
	})

	return (
		<ol className='space-y-4 mt-4'>
			<p className='hidden last:block text-sm text-muted-foreground text-center'>
				No activity found inside this organization
			</p>
			{auditLog.map((item) => (
				<ActivityItem data={item} key={item.id} />
			))}
		</ol>
	)
}

ActivityList.Skeleton = function ActivityListSkeleton() {
	return (
		<ol className='space-y-4 mt-4'>
			<Skeleton className='w-[80%] h-14' />
			<Skeleton className='w-[50%] h-14' />
			<Skeleton className='w-[70%] h-14' />
			<Skeleton className='w-[80%] h-14' />
			<Skeleton className='w-[75%] h-14' />
		</ol>
	)
}

export default ActivityList
