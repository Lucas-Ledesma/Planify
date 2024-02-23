'use client'

import { Plus, X } from 'lucide-react'
import { ListWrapper } from './list-wrapper'
import { useParams, useRouter } from 'next/navigation'
import { ElementRef, useRef, useState } from 'react'
import { FormInput } from '@/components/form/form-input'
import { useAction } from '@/hooks/use-actions'
import { toast } from 'sonner'
import { createList } from '@/actions/create-list'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import {
	useEventListener,
	useOnClickOutside,
} from 'usehooks-ts'

export const ListForm = () => {
	const router = useRouter()
	const params = useParams()

	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)

	const [isEditing, setIsEditing] = useState(false)

	const { execute, fieldErrors } = useAction(createList, {
		onSuccess: (data) => {
			toast.success(`List "${data.title}" created`)
			disableEditing()
			router.refresh()
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			inputRef.current?.focus()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableEditing()
		}
	}

	useEventListener('keydown', onKeyDown)
	useOnClickOutside(formRef, disableEditing)

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const boardId = formData.get('boardId') as string

		execute({
			title,
			boardId,
		})
	}

	if (isEditing) {
		return (
			<ListWrapper>
				<form
					action={onSubmit}
					ref={formRef}
					className='w-full bg-primary-foreground p-3 rounded-md space-y-4 shadow-md'>
					<FormInput
						ref={inputRef}
						errors={fieldErrors}
						id='title'
						className='text-sm bg-neutral-800 focus-visible:outline-none focus-visible:ring-transparent px-2 py-1 h-7 font-medium border-transparent  transition'
						placeholder='Enter list title...'
					/>
					<input
						hidden
						value={params.boardId}
						name='boardId'
					/>
					<div className='flex items-center gap-x-1'>
						<FormSubmit
							className='bg-neutral-900'
							variant='outline'>
							Add list
						</FormSubmit>
						<Button
							onClick={disableEditing}
							size='sm'
							variant='ghost'
							className=''>
							<X className='h-5 w-5 ' />
						</Button>
					</div>
				</form>
			</ListWrapper>
		)
	}

	return (
		<ListWrapper>
			<button
				onClick={enableEditing}
				className='w-full rounded-md bg-primary-foreground transition p-3 flex items-center font-medium text-sm'>
				<Plus className='h-4 w-4 mr-2' />
				Add a list
			</button>
		</ListWrapper>
	)
}
