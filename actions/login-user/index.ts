'use server'

import { InputType, ReturnType } from './type'
import { signIn } from '@/auth'
import { createSafeAction } from '@/lib/create-safe-action'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginUser } from './schema'
import { AuthError } from 'next-auth'

const handler = async (
	data: InputType
): Promise<ReturnType> => {
	const { email, password } = data

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		})

		return { data: { msg: 'Loggin Succesfully' } }
	} catch (error: any) {
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

export const loginUser = createSafeAction(
	LoginUser,
	handler
)
