'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginSchema } from '@/schemas'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import CardWrapper from '@/components/auth/cardWrapper'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Button } from '../ui/button'
import getUserByEmail from '@/actions/getUserByEmail'
import loginUser from '@/actions/loginUser'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const LoginForm = () => {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl')
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email already in use with different provider!'
			: ''
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<
		string | undefined
	>('')
	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (
		values: z.infer<typeof LoginSchema>
	) => {
		setError('')
		setSuccess('')

		startTransition(async () => {
			try {
				const { email, password } = values

				const validatedFields =
					LoginSchema.safeParse(values)

				if (!validatedFields.success) {
					setError('Invalid fields!')
					return
				}

				await signIn('credentials', {
					email,
					password,
					redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
				})

				setSuccess('login succesfully')
			} catch (error: any) {
				console.log(error)

				if (error.response.data.msg) {
					setError(error.response.data.msg)
					return
				}

				alert(error)
			}
		})
	}

	return (
		<CardWrapper
			headerLabel='Welcome back'
			backButtonLabel="Don't have an account?"
			backButtonHref='/register'
			showSocial>
			<Form {...form}>
				<form
					accessKey='Enter'
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder='john.doe@example.com'
											type='email'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder='******'
											type='password'
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button
						disabled={isPending}
						type='submit'
						className='w-full bg-black/80 hover:bg-black/60'>
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
