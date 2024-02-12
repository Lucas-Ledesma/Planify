import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import getOrgByOwner from '@/actions/getOrgsByUser'

import SidebarAcordeon from './sidebar-acordion'
import { auth } from '@/auth'

interface SidebarProps {
	storageKey?: string
	activeOrganizationId: string
}

export const Sidebar = async ({
	activeOrganizationId,
	storageKey = 't-sidebar-state',
}: SidebarProps) => {
	const data = await auth()

	const organizations = await getOrgByOwner(data?.user?.id)

	return (
		<>
			<div className=''>
				<Button
					size='sm'
					asChild
					className='flex justify-between items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline'
					variant='ghost'>
					<Link href='/organization/form'>
						<span>Workspaces</span>
						<Plus className='h-4 w-4' />
					</Link>
				</Button>
			</div>
			<SidebarAcordeon
				organizations={organizations}
				storageKey={storageKey}
				activeOrganizationId={activeOrganizationId}
			/>
		</>
	)
}
