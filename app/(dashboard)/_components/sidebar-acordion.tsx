'use client'

import { Accordion } from '@/components/ui/accordion'
import { Org } from '@/type'
import NavItem from './navbar-item'
import { useLocalStorage } from 'usehooks-ts'
import { useEffect, useState } from 'react'

interface SidebarAcordionProps {
	organizations: Org[]
	activeOrganizationId: string
	storageKey: string
}

const SidebarAcordion = ({
	activeOrganizationId,
	organizations,
	storageKey,
}: SidebarAcordionProps) => {
	const [expanded, setExpanded] = useLocalStorage<
		Record<string, any>
	>(storageKey, {})

	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return
	}

	if (expanded === undefined || expanded === null) {
		return
	}

	const defaultAccordionValue: string[] = Object.keys(
		expanded
	).reduce((acc: string[], key: string) => {
		if (expanded[key]) {
			acc.push(key)
		}

		return acc
	}, [])

	const onExpand = (id: string) => {
		setExpanded((curr) => ({
			...curr,
			[id]: !expanded[id],
		}))
	}
	return (
		<Accordion
			type='multiple'
			className='space-y-2'
			defaultValue={defaultAccordionValue}>
			{organizations.map((organization) => {
				return (
					<NavItem
						key={organization.id}
						isActive={
							activeOrganizationId === organization.id
						}
						isExpanded={expanded[organization.id]}
						organization={organization}
						onExpand={onExpand}
					/>
				)
			})}
		</Accordion>
	)
}

export default SidebarAcordion
