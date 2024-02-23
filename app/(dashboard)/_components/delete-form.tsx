'use client'

import { deleteOrganization } from '@/actions/delete-org'
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

const DeleteForm = ({
	organizationId,
}: {
	organizationId: string
	userId: string
}) => {
	const { push } = useRouter()

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

	const onDelete = async () => {
		deleteExcute({ id: organizationId })
	}

	return (
		<Dialog>
			<DialogTrigger>
				<Button variant={'destructive'}>Delete</Button>
			</DialogTrigger>
			<DialogContent className='bg-primary-foreground'>
				<DialogHeader>
					<DialogTitle>
						Are you absolutely sure?
					</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will
						permanently delete your account and remove your
						data from our servers.
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
	)
}

export default DeleteForm
