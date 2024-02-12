'use client'

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { Org } from '@/type'
import {
	Activity,
	CreditCard,
	Layout,
	Settings,
} from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

interface NavbarItemProps {
	isActive: boolean
	isExpanded: boolean
	organization: Org
	onExpand: (id: string) => void
}

const NavItem = ({
	isActive,
	isExpanded,
	onExpand,
	organization,
}: NavbarItemProps) => {
	const router = useRouter()
	const pathname = usePathname()

	const routes = [
		{
			label: 'Boards',
			icon: <Layout className='h-4 w-4 mr-2' />,
			href: `/organization/${organization.id}`,
		},
		{
			label: 'Activity',
			icon: <Activity className='h-4 w-4 mr-2' />,
			href: `/organization/${organization.id}/activity`,
		},
		{
			label: 'Settings',
			icon: <Settings className='h-4 w-4 mr-2' />,
			href: `/organization/${organization.id}/settings`,
		},
		{
			label: 'Billing',
			icon: <CreditCard className='h-4 w-4 mr-2' />,
			href: `/organization/${organization.id}/billing`,
		},
	]

	const onClick = (href: string) => {
		router.push(href)
	}

	return (
		<AccordionItem
			value={organization.id}
			className='border-none'>
			<AccordionTrigger
				className={cn(
					'flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline',
					isActive &&
						!isExpanded &&
						'bg-primary/5 text-primary'
				)}
				onClick={() => {
					onExpand(organization.id)
				}}>
				<span className='font-medium text-sm'>
					{organization.title}
				</span>
			</AccordionTrigger>
			<AccordionContent className='pt-1 text-neutral-700'>
				{routes.map((route) => (
					<Button
						key={route.href}
						size='sm'
						onClick={() => onClick(route.href)}
						className={cn(
							'w-full font-normal justify-start pl-4 mb-1',
							pathname === route.href &&
								'bg-primary/5 text-primary'
						)}
						variant='ghost'>
						{route.icon}
						{route.label}
					</Button>
				))}
			</AccordionContent>
		</AccordionItem>
	)
}

NavItem.Skeleton = function SkeletonNavItem() {
	return (
		<div className='flex items-center gap-x-2'>
			<div className='w-10 h-10 relative shrink-0'>
				<Skeleton className='h-full w-full absolute' />
			</div>
			<Skeleton className='h-10 w-full' />
		</div>
	)
}

export default NavItem
