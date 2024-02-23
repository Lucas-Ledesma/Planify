'use client'

import { createNotification } from '@/actions/create-notification'
import { deleteOrganization } from '@/actions/delete-org'
import { FormSuccess } from '@/components/form-success'
import { FormErrors } from '@/components/form/form-errors'
import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useAction } from '@/hooks/use-actions'
import { DialogClose } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

const SettingsForm = ({
	organizationId,
	userId,
}: {
	organizationId: string
	userId: string
}) => {
	const { push } = useRouter()
	const { execute, fieldErrors, data, error } = useAction(
		createNotification
	)
	const closeRef = useRef<ElementRef<'button'>>(null)

	const { execute: deleteExcute } = useAction(
		deleteOrganization,
		{
			onSuccess: (data) => {
				if (data.msg === 'redirect') {
					toast.success(
						'Organization was deleted succcessfully'
					)
					closeRef.current?.click()
					push('/organization')
				} else {
					push(`/organization/${data.msg}`)
				}
			},
		}
	)

	const onSubmit = (formData: FormData) => {
		const email = formData.get('email') as string

		execute({ id: userId, orgId: organizationId, email })
	}

	const onDelete = async () => {
		deleteExcute({ id: organizationId })
	}

	return (
		<>
			<Dialog>
				<DialogTrigger>
					<Button>Invite</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Enter the email of who you want to invite
						</DialogTitle>
					</DialogHeader>
					<form
						action={onSubmit}
						className='flex flex-col gap-4'>
						<FormInput
							id={'email'}
							placeholder='jhondoe@gmail.com'
							required
						/>

						<FormSuccess message={data?.msg} />
						<FormErrors errors={fieldErrors} id='email' />

						<div className='flex w-full gap-4'>
							<DialogClose ref={closeRef}>
								<Button variant={'outline'}>Cancel</Button>
							</DialogClose>
							<FormSubmit>Confirm</FormSubmit>
						</div>
					</form>
				</DialogContent>
			</Dialog>

			<Dialog>
				<DialogTrigger>
					<Button variant={'destructive'}>Delete</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Are you absolutely sure?
						</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will
							permanently delete your account and remove
							your data from our servers.
						</DialogDescription>
					</DialogHeader>
					<div className='flex w-full gap-4'>
						<DialogClose>
							<Button variant={'outline'}>Cancel</Button>
						</DialogClose>
						<form action={onDelete}>
							<FormSubmit variant='destructive'>
								Confirm
							</FormSubmit>
						</form>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default SettingsForm
