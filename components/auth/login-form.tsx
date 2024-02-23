'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

import CardWrapper from '@/components/auth/cardWrapper'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { useAction } from '@/hooks/use-actions'
import { FormInput } from '../form/form-input'
import { FormSubmit } from '../form/form-submit'
import { loginUser } from '@/actions/login-user'

export const LoginForm = () => {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl')
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email already in use with different provider!'
			: ''

	const [error, setError] = useState<string>('')
	const [success, setSuccess] = useState<string>('')

	const { execute } = useAction(loginUser, {
		onError: (data) => {
			setError(data)
		},
		onSuccess: (data) => {
			setSuccess(data.msg)
		},
	})

	async function onSubmit(formData: FormData) {
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		execute({ email, password })
	}

	return (
		<CardWrapper
			headerLabel='Welcome back'
			backButtonLabel="Don't have an account?"
			backButtonHref='/register'
			showSocial>
			<form
				accessKey='Enter'
				action={onSubmit}
				className='space-y-6'>
				<div className='space-y-4'>
					<FormInput
						label='Email'
						id={'email'}
						className='bg-neutral-800 focus-visible:outline-none focus-visible:ring-transparent'
						placeholder='jhondoe@gmail.com'
						required
					/>

					<FormInput
						label='Password'
						id={'password'}
						className='bg-neutral-800 focus-visible:outline-none focus-visible:ring-transparent'
						placeholder='******'
						required
						type='password'
					/>
				</div>
				<FormError message={error || urlError} />
				<FormSuccess message={success} />
				<FormSubmit variant='outline' className='w-full '>
					Login
				</FormSubmit>
			</form>
		</CardWrapper>
	)
}
