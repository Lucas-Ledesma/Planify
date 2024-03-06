'use client'

import { Bell, Check, X } from 'lucide-react'
import { buttonVariants } from './ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from './ui/popover'
import { Separator } from './ui/separator'
import { useEffect, useState } from 'react'
import { Notification } from '@/type'
import { FormSubmit } from './form/form-submit'
import getNoification from '@/actions/get/getNotification'
import { useAction } from '@/hooks/use-actions'
import { deleteNotification } from '@/actions/delete-notification'
import { inviteUser } from '@/actions/invite-user'
import { useQuery } from '@tanstack/react-query'

interface NotificationProps {
	id: string
}

const Notification = ({ id }: NotificationProps) => {
	const [notifications, setNotification] = useState<
		Notification[] | []
	>([])

	const { execute: deleteExecute } = useAction(
		deleteNotification
	)

	const { execute: inviteExecute } = useAction(inviteUser)

	const [isMounted, setIsMounted] = useState(false)

	const { data } = useQuery({
		queryKey: ['notification', 'notificationFetch'],
		queryFn: () => getNoification(id),
	})

	useEffect(() => {
		setIsMounted(true)
		if (data) {
			setNotification(data)
		}
	}, [data])

	if (!isMounted) {
		return null
	}

	const onInvite = async (notification: Notification) => {
		const { receiver, sender, organization } = notification

		inviteExecute({
			email: receiver.email,
			orgId: organization.id,
			id: sender.id,
		})

		setNotification((prevNotifications) =>
			prevNotifications.filter(
				(notif) => notif.id !== notification.id
			)
		)
	}

	const onDelete = async (notification: Notification) => {
		deleteExecute({
			id: notification.id,
		})

		setNotification((prevNotifications) =>
			prevNotifications.filter(
				(notif) => notif.id !== notification.id
			)
		)
	}

	return (
		<Popover>
			<PopoverTrigger
				disabled={!notifications}
				className={buttonVariants({
					variant: 'ghost',
					size: 'icon',
					className: 'relative',
				})}>
				<Bell className='size-6 text-neutral-600' />
				{notifications && notifications?.length > 0 && (
					<div className='absolute bg-red-500 size-4 rounded-md text-white left-4 top-1'>
						{notifications?.length}
					</div>
				)}
			</PopoverTrigger>
			<PopoverContent className='w-full flex justify-center items-center bg-primary-foreground'>
				<div>
					<div className='flex flex-col gap-4'>
						<div className='space-y-2'>
							<h4 className='font-medium leading-none'>
								Notification
							</h4>
							<Separator />
						</div>
						{notifications?.map((notification) => {
							return (
								<div
									className='flex gap-2 items-center'
									key={notification.id}>
									<p className='text-sm text-muted-foreground'>
										{notification.sender.name} invitation to
										join {notification.organization.title}
									</p>
									<form
										action={() => onInvite(notification)}>
										<FormSubmit
											variant={'outline'}
											size={'sm'}>
											<Check className='size-3' />
										</FormSubmit>
									</form>

									<form
										action={() => onDelete(notification)}>
										<FormSubmit
											variant={'destructive'}
											size={'sm'}>
											<X className='size-3' />
										</FormSubmit>
									</form>
								</div>
							)
						})}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default Notification
