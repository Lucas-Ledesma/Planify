'use client'

import { toast } from 'sonner'
import { MoreHorizontal, X } from 'lucide-react'

import { deleteBoard } from '@/actions/delete-board'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { useAction } from '@/hooks/use-actions'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { ElementRef, useRef } from 'react'
import { FormSubmit } from '@/components/form/form-submit'

interface BoardOptionsProps {
	id: string
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
	const router = useRouter()

	const { execute } = useAction(deleteBoard, {
		onError: (error) => {
			toast.error(error)
		},
		onSuccess: (data) => {
			toast.success('Board deleted')
			closeRef.current?.click()
			router.push(`/organization/${data.redirect}`)
		},
	})

	const closeRef = useRef<ElementRef<'button'>>(null)

	const onDelete = () => {
		execute({ id })
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className='h-auto w-auto p-2'
					variant='transparent'>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='px-0 pt-3 pb-3 bg-primary-foreground'
				side='bottom'
				align='start'>
				<div className='text-sm font-bold text-center text-neutral-600 pb-4'>
					Board actions
				</div>
				<Separator />
				<PopoverClose ref={closeRef} asChild>
					<Button
						className='h-auto w-auto p-2 absolute top-2 right-2 '
						variant='ghost'>
						<X className='h-4 w-4' />
					</Button>
				</PopoverClose>
				<form action={onDelete}>
					<FormSubmit
						variant='ghost'
						className='rounded-none w-full h-auto px-5 justify-center font-normal text-sm'>
						Delete this board
					</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	)
}
