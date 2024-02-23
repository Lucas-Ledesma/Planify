import React from 'react'
import { Info } from './_components/info'
import { Separator } from '@/components/ui/separator'
import { BoardList } from './_components/board-list'

function OrganizationPage({
	params,
}: {
	params: { organizationId: string }
}) {
	const { organizationId } = params

	return (
		<div className='w-full mb-20'>
			<Info isPro={false} organizationId={organizationId} />
			<Separator className='my-4' />
			<BoardList organizationId={organizationId} />
		</div>
	)
}

export default OrganizationPage
