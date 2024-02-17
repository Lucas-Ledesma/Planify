import { z } from 'zod'

export const LoginUser = z.object({
	email: z
		.string({ required_error: 'Email is requiered' })
		.email({ message: 'Email must be in Email format' }),
	password: z
		.string({
			required_error: 'Password is requiered',
		})
		.min(6, {
			message: 'Password has to be at least 6 characters',
		}),
})
