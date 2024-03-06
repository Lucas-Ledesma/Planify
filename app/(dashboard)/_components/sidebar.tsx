'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import SidebarAcordion from './sidebar-acordion'
import getOrg from '@/actions/get/getOrg'
import { useEffect, useState } from 'react'
import { Org } from '@/type'
import { useSession } from 'next-auth/react'
import NavItem from './navbar-item'
import { useQuery } from '@tanstack/react-query'

interface SidebarProps {
	storageKey?: string
	activeOrganizationId: string
}

export const Sidebar = ({
	activeOrganizationId,
	storageKey = 't-sidebar-state',
}: SidebarProps) => {
	const { data: session } = useSession()

	const {
		data: organizations,
		isLoading,
		isPending,
	} = useQuery({
		queryKey: ['organization', 'org-fetcher'],
		queryFn: () => {
			return getOrg({
				userId: session?.user?.id,
			})
		},
		enabled: !!session?.user?.id,
	})

	if (
		organizations === undefined ||
		isLoading ||
		isPending
	) {
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
				<div className='space-y-2'>
					<NavItem.Skeleton />
					<NavItem.Skeleton />
					<NavItem.Skeleton />
				</div>
			</>
		)
	}

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

			<SidebarAcordion
				activeOrganizationId={activeOrganizationId}
				organizations={organizations}
				storageKey={storageKey}
			/>
		</>
	)
}
