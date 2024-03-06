import { Separator } from '@/components/ui/separator'

import { checkSubscription } from '@/lib/subscription'
import { Info } from '../_components/info'
import { SubscriptionButton } from './_components/subscription-button'

const BillingPage = async ({
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
				isPro={isPro}
				organizationId={params.organizationId}
			/>
			<Separator className='my-2' />
			<SubscriptionButton
				isPro={isPro}
				orgId={params.organizationId}
			/>
		</div>
	)
}

export default BillingPage
