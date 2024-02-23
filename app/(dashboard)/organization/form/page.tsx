'use client'

import { createOrganization } from '@/actions/create-org'
import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-actions'
import { useRouter } from 'next/navigation'

const Form = () => {
	const router = useRouter()

	const { execute, isLoading } = useAction(
		createOrganization,
		{
			onSuccess: () => {
				router.push('/organization')
			},
		}
	)

	async function onSubmit(formData: FormData) {
		const title = formData.get('title') as string

		execute({ title })
	}

	return (
		<div className='h-full w-full relative '>
			<form
				action={onSubmit}
				className='absolute bg-primary-foreground border-2 gap-4 justify-between flex-col p-6 inset-0 top-52 overflow-hidden mx-auto flex rounded-lg max-w-md h-64 shadow'>
				<div>
					<h1 className=' font-bold text-2xl'>
						Create Organization
					</h1>
					<h2 className='text-neutral-400 text-sm'>
						to continue to Planify
					</h2>
				</div>

				<FormInput
					label='Organization title'
					id={'title'}
					required
				/>

				<div className='flex gap-4'>
					<Button
						variant={'ghost'}
						onClick={() => router.push('/organization')}
						type='button'
						disabled={isLoading}>
						Cancel
					</Button>
					<FormSubmit>Create</FormSubmit>
				</div>
			</form>
		</div>
	)
}

export default Form
