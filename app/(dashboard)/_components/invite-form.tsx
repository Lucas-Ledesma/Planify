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
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

const InviteForm = ({
	organizationId,
	userId,
}: {
	organizationId: string
	userId: string
}) => {
	const { execute, fieldErrors, data } = useAction(
		createNotification
	)
	const closeRef = useRef<ElementRef<'button'>>(null)

	const onSubmit = (formData: FormData) => {
		const email = formData.get('email') as string

		execute({ id: userId, orgId: organizationId, email })
	}

	return (
		<Dialog>
			<DialogTrigger className='w-full'>
				<div className=' w-full hover:opacity-50 border-b bg-neutral-800 rounded-md px-6 py-4 justify-center flex items-center gap-2 font-medium  whitespace-nowrap '>
					<Plus className='size-5' />
				</div>
			</DialogTrigger>
			<DialogContent className='bg-primary-foreground'>
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
						className='bg-neutral-800 focus-visible:outline-none focus-visible:ring-transparent'
						placeholder='jhondoe@gmail.com'
						required
					/>

					<FormSuccess message={data?.msg} />
					<FormErrors errors={fieldErrors} id='email' />

					<div className='flex w-full gap-4'>
						<DialogClose ref={closeRef}>
							<Button variant={'ghost'}>Cancel</Button>
						</DialogClose>
						<FormSubmit variant='outline'>
							Confirm
						</FormSubmit>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default InviteForm
