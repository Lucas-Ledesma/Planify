'use client'

import { leaveOrganization } from '@/actions/leave-org'
import { FormSubmit } from '@/components/form/form-submit'
import {
	Button,
	buttonVariants,
} from '@/components/ui/button'
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
import { toast } from 'sonner'

const LeaveForm = ({
	organizationId,
	userId,
}: {
	organizationId: string
	userId: string
}) => {
	const { push } = useRouter()

	const { execute: deleteExcute } = useAction(
		leaveOrganization,
		{
			onSuccess: (data) => {
				if (data.length < 0) {
					toast.success(
						'Organization was deleted succcessfully'
					)
					push('/organization')
				}
				toast.success(
					'Organization was deleted succcessfully'
				)
				push(`/organization/${data[0].id}`)
			},
		}
	)

	const onLeave = async () => {
		deleteExcute({ orgId: organizationId, userId })
	}

	return (
		<Dialog>
			<DialogTrigger
				className={buttonVariants({
					variant: 'destructive',
				})}>
				Leave
			</DialogTrigger>
			<DialogContent className='bg-primary-foreground'>
				<DialogHeader>
					<DialogTitle>
						Are you absolutely sure?
					</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will
						permanently leave the organization.
					</DialogDescription>
				</DialogHeader>
				<div className='flex w-full gap-4'>
					<DialogClose>
						<Button variant={'outline'}>Cancel</Button>
					</DialogClose>
					<form action={onLeave}>
						<FormSubmit variant='destructive'>
							Confirm
						</FormSubmit>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default LeaveForm
