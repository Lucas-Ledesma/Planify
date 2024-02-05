'use server'

import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas'
import axios from 'axios'
import { AuthError } from 'next-auth'
import { z } from 'zod'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user/login`

const loginUser = async (
	values: z.infer<typeof LoginSchema>,
	callbackUrl?: string | null
) => {
	try {
		const validatedFields = LoginSchema.safeParse(values)

		if (!validatedFields.success) {
			return { error: 'Invalid fields!' }
		}

		const { email, password } = validatedFields.data

		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		})

		return { success: 'Loggin Succesfully' }
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid credentials!' }
				default:
					return { error: 'Something went wrong!' }
			}
		}

		throw error
	}
}

export default loginUser
