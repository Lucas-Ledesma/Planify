'use client'

import { Accordion } from '@/components/ui/accordion'
import { Org } from '@/type'
import { useLocalStorage } from 'usehooks-ts'
import NavItem from './navbar-item'

interface SidebarAcordeonProps {
	organizations: Org[]
	storageKey: string
	activeOrganizationId: string
}

const SidebarAcordeon = ({
	organizations,
	storageKey,
	activeOrganizationId,
}: SidebarAcordeonProps) => {
	const [expanded, setExpanded] = useLocalStorage<
		Record<string, any>
	>(storageKey, {})

	const onExpand = (id: string) => {
		setExpanded((curr) => ({
			...curr,
			[id]: !expanded[id],
		}))
	}

	const defaultAccordionValue: string[] = Object.keys(
		expanded
	).reduce((acc: string[], key: string) => {
		if (expanded[key]) {
			acc.push(key)
		}

		return acc
	}, [])

	return (
		<Accordion
			type='multiple'
			defaultValue={defaultAccordionValue}
			className='space-y-2'>
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

export default SidebarAcordeon
