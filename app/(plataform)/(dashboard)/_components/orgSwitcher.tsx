import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Org } from '@/type'
import { ChevronsUpDown } from 'lucide-react'
import Link from 'next/link'

function OrgSwitcher({
	orgs,
	currentOrgId,
}: {
	orgs: Org[]
	currentOrgId: string
}) {
	const currentOrg = orgs.find(
		(org) => org.id === currentOrgId
	)

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					className='p-1 pl-2'>
					{currentOrg?.title}
					<ChevronsUpDown className='size-4 opacity-80 ml-2' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-80'>
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
							<div className='grid gap-2'>
								<Button variant={'outline'} asChild>
									<Link href={`/organization/${org.id}`}>
										{org.title}
									</Link>
								</Button>
							</div>
						)
					})}
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default OrgSwitcher
