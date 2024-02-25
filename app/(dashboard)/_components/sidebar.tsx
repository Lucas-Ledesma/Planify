'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import SidebarAcordion from './sidebar-acordion'
import getOrg from '@/actions/getOrg'
import { useEffect, useState } from 'react'
import { Org } from '@/type'
import { useSession } from 'next-auth/react'
import NavItem from './navbar-item'

interface SidebarProps {
	storageKey?: string
	activeOrganizationId: string
}

export const Sidebar = ({
	activeOrganizationId,
	storageKey = 't-sidebar-state',
}: SidebarProps) => {
	const [isLoading, setIsLoading] = useState(true)
	const [organizations, setOrganizations] = useState<Org[]>(
		[]
	)
	const { data: session } = useSession()

	useEffect(() => {
		const fetchData = async () => {
			setOrganizations([
				{
					id: '',
					createdAt: '',
					title: '',
					usersFromOrg: [],
				},
			])

			const orgsData = await getOrg({
				userId: session?.user?.id,
			})

			setOrganizations(orgsData)
			setIsLoading(false)
		}

		if (
			organizations.length === 0 &&
			session &&
			session.user &&
			session.user.id
		) {
			fetchData()
		}
	}, [session, organizations])

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

			{isLoading ? (
				<div className='space-y-2'>
					<NavItem.Skeleton />
					<NavItem.Skeleton />
					<NavItem.Skeleton />
				</div>
			) : (
				<SidebarAcordion
					activeOrganizationId={activeOrganizationId}
					organizations={organizations}
					storageKey={storageKey}
				/>
			)}
		</>
	)
}
