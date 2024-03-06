import { Separator } from '@/components/ui/separator'
import { Info } from '../_components/info'
import ActivityList from './_components/activity-list'
import { Suspense } from 'react'
import { checkSubscription } from '@/lib/subscription'

const ActivityPage = async ({
	params,
}: {
	params: { organizationId: string }
}) => {
	const isPro = await checkSubscription({
		orgId: params.organizationId,
	})

	return (
		<div className='w-full'>
			<Info
				organizationId={params.organizationId}
				isPro={isPro}
			/>
			<Separator className='mt-4' />
			<Suspense fallback={ActivityList.Skeleton()}>
				<ActivityList
					organizationId={params.organizationId}
				/>
			</Suspense>
		</div>
	)
}

export default ActivityPage
