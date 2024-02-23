import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import SidebarAcordeon from './sidebar-acordion'
import { auth } from '@/auth'
import getOrg from '@/actions/getOrg'

interface SidebarProps {
	storageKey?: string
	activeOrganizationId: string
}

export const Sidebar = async ({
	activeOrganizationId,
	storageKey = 't-sidebar-state',
}: SidebarProps) => {
	const data = await auth()

	const organizations = await getOrg({
		userId: data?.user?.id,
	})

	return (
		<>
			<Button
				size='sm'
				asChild
				className='flex justify-between mb-2 items-center gap-x-2 p-1.5 text-white rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline'
				variant='ghost'>
				<Link href='/organization/form'>
					<span>Workspaces</span>
					<Plus className='h-4 w-4' />
				</Link>
			</Button>

			<SidebarAcordeon
				organizations={organizations}
				storageKey={storageKey}
				activeOrganizationId={activeOrganizationId}
			/>
		</>
	)
}
