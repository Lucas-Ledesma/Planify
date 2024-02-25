'use client'

import { useEffect, useState } from 'react'
import changeRole from '@/actions/changeRole'
import {
	Button,
	buttonVariants,
} from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import type { Org, usersFromOrg } from '@/type'
import { ChevronsUpDown } from 'lucide-react'

const RoleSwitcher = ({
	user,
	org,
	isAdmin,
}: {
	user: usersFromOrg
	org: Org
	isAdmin: boolean
}) => {
	const [currentUser, setCurrentUser] = useState(user)
	const [isLoading, setIsLoading] = useState(false)
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return

	async function onClick(newRole: 'ADMIN' | 'GUEST') {
		try {
			setIsLoading(true)
			await changeRole({
				userId: user.user.id,
				orgId: org.id,
				role: newRole,
			})
			setCurrentUser({ ...currentUser, role: newRole })
		} catch (error) {
			console.error('Error al cambiar el rol:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Popover>
			<PopoverTrigger
				disabled={isLoading || !isAdmin}
				className={buttonVariants({
					variant: 'ghost',
					size: 'sm',
					className: 'px-0',
				})}>
				{currentUser.role}
				<ChevronsUpDown className='size-4 opacity-80 ml-2' />
			</PopoverTrigger>
			<PopoverContent className='w-80'>
				<div className='grid gap-4'>
					<div className='space-y-2'>
						<h4 className='font-medium leading-none'>
							Roles
						</h4>
						<p className='text-sm text-muted-foreground'>
							Cambiar el rol para ajustar los permisos.
						</p>
					</div>
					<div
						key={currentUser.user.id}
						className='grid gap-2'>
						<Button
							variant={'outline'}
							disabled={isLoading || !isAdmin}
							onClick={() => onClick('ADMIN')}>
							ADMIN
						</Button>
						<Button
							variant={'outline'}
							disabled={isLoading || !isAdmin}
							onClick={() => onClick('GUEST')}>
							GUEST
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default RoleSwitcher
