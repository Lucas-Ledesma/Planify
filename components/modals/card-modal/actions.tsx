'use client'

import { toast } from 'sonner'
import { ClipboardList, Copy, Trash } from 'lucide-react'
import { useParams } from 'next/navigation'

import { copyCard } from '@/actions/copy-card'
import { Skeleton } from '@/components/ui/skeleton'
import { useCardModal } from '@/hooks/use-card-modal'
import { useAction } from '@/hooks/use-actions'
import { deleteCard } from '@/actions/delete-card'
import { Card } from '@/type'
import { FormSubmit } from '@/components/form/form-submit'

interface ActionsProps {
	data: Card
}

export const Actions = ({ data }: ActionsProps) => {
	const params = useParams()
	const cardModal = useCardModal()

	const { execute: executeCopyCard } = useAction(copyCard, {
		onSuccess: (data) => {
			toast.success(`Card "${data.title}" copied`)
			cardModal.onClose()
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const { execute: executeDeleteCard } = useAction(
		deleteCard,
		{
			onSuccess: (data) => {
				toast.success(`Card "${data.title}" deleted`)
				cardModal.onClose()
			},
			onError: (error) => {
				toast.error(error)
			},
		}
	)

	const onCopy = () => {
		const boardId = params.boardId as string

		executeCopyCard({
			id: data.id,
			boardId,
			title: data.title,
		})
	}

	const onDelete = () => {
		const boardId = params.boardId as string

		executeDeleteCard({
			id: data.id,
			boardId,
		})
	}

	return (
		<div className='mt-2 md:mt-0 flex md:flex-col md:items-start items-center justify-start gap-2 text-center'>
			<p className='font-semibold flex items-center'>
				<ClipboardList className='size-5 mr-2 md:ml-[6px]' />
				Actions:
			</p>
			<form action={onCopy}>
				<FormSubmit
					className='justify-start'
					variant='ghost'
					size='inline'>
					<Copy className='h-4 w-4 mr-2' />
					Copy
				</FormSubmit>
			</form>

			<form action={onDelete}>
				<FormSubmit
					className='justify-start'
					variant='ghost'
					size='inline'>
					<Trash className='h-4 w-4 mr-2' />
					Delete
				</FormSubmit>
			</form>
		</div>
	)
}

Actions.Skeleton = function ActionsSkeleton() {
	return (
		<div className='space-y-2 mt-2'>
			<Skeleton className='w-20 h-4 bg-neutral-800' />
			<Skeleton className='w-full h-8 bg-neutral-800' />
			<Skeleton className='w-full h-8 bg-neutral-800' />
		</div>
	)
}
