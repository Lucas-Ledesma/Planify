'use client'

import { Bell, Check, X } from 'lucide-react'
import { Button, buttonVariants } from './ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from './ui/popover'
import { Separator } from './ui/separator'
import getNoification from '@/actions/getNotification'
import { useEffect, useState } from 'react'
import { Notification } from '@/type'
import inviteUser from '@/actions/inviteUser'
import deleteNotificarion from '@/actions/deleteNotification'
import { useRouter } from 'next/navigation'

const Notification = ({
	id,
}: {
	id: string | undefined
}) => {
	const [isLoading, setIsLoading] = useState(false)
	const [notifications, setNotification] = useState<
		Notification[] | []
	>([])

	const [isMounted, setIsMounted] = useState(false)

	const router = useRouter()

	useEffect(() => {
		setIsMounted(true)
		async function fetchData() {
			try {
				const notifications = await getNoification(id)
				setNotification(notifications)
			} catch (error) {
				console.error('Error fetching notification:', error)
			}
		}

		fetchData()
	}, [])

	if (!isMounted) {
		return null
	}

	const onClick = async (
		action: string,
		notification: Notification
	) => {
		const { receiver, sender, organization } = notification
		if (action === 'invite' && organization.id) {
			try {
				setIsLoading(true)
				await inviteUser(
					receiver.email,
					organization.id,
					sender.id
				)
				setNotification((prevNotifications) =>
					prevNotifications.filter(
						(notif) => notif.id !== notification.id
					)
				)
				router.refresh()
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoading(false)
			}
		}

		try {
			setIsLoading(true)
			await deleteNotificarion(notification.id)
			setNotification((prevNotifications) =>
				prevNotifications.filter(
					(notif) => notif.id !== notification.id
				)
			)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	const haveNotification = notifications?.length > 0

	return (
		<Popover>
			<PopoverTrigger
				disabled={!haveNotification}
				className={buttonVariants({
					variant: 'ghost',
					size: 'icon',
					className: 'relative',
				})}>
				<Bell className='size-6 text-neutral-600' />
				{notifications?.length > 0 && (
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
						{notifications.map((notification) => {
							return (
								<div className='flex gap-2 items-center'>
									<p className='text-sm text-muted-foreground'>
										{notification.sender.name} invitation to
										join {notification.organization.title}
									</p>
									<Button
										variant={'outline'}
										disabled={isLoading}
										size={'sm'}
										onClick={() =>
											onClick('invite', notification)
										}>
										<Check className='size-3' />
									</Button>
									<Button
										onClick={() =>
											onClick('delete', notification)
										}
										variant={'destructive'}
										disabled={isLoading}
										size={'sm'}>
										<X className='size-3' />
									</Button>
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
