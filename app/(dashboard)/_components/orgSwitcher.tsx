'use client'

import {
	Button,
	buttonVariants,
} from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Org } from '@/type'
import { ChevronsUpDown } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface OrgSwitcherProps {
	orgs: Org[]
	activeOrg?: Org
}

function OrgSwitcher({
	orgs,
	activeOrg,
}: OrgSwitcherProps) {
	const params = useParams()
	const router = useRouter()

	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}

	function onClick(url: string) {
		router.push(url)
	}

	const currentOrg = orgs.find(
		(org) => org.id === params.organizationId
	)

	return (
		<Popover>
			<PopoverTrigger
				className={buttonVariants({
					variant: 'outline',
					size: 'sm',
				})}>
				{currentOrg?.title || activeOrg?.title}
				<ChevronsUpDown className='size-4 opacity-80 ml-2' />
			</PopoverTrigger>
			<PopoverContent className='w-80 bg-primary-foreground'>
				<div className='grid gap-4'>
					<div className='space-y-2'>
						<h4 className='font-medium leading-none'>
							Organizations
						</h4>
						<p className='text-sm text-muted-foreground'>
							Select any organization.
						</p>
					</div>
					{orgs.map((org) => {
						return (
							<div key={org.id} className='grid gap-2'>
								<Button
									variant={'ghost'}
									onClick={() =>
										onClick(`/organization/${org.id}`)
									}>
									{org.title}
								</Button>
							</div>
						)
					})}
					<Button
						asChild
						variant={'outline'}
						className='rounded-sm  h-auto hidden text-center md:block'>
						<Link href={'/organization/form'}>
							Create new organization
						</Link>
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default OrgSwitcher
