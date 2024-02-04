import * as z from 'zod'

export const LoginSchema = z.object({
	email: z
		.string()
		.email({ message: 'Email is requiered' }),
	password: z.string(),
})

export const RegisterSchema = z.object({
	email: z
		.string()
		.email({ message: 'Email is requiered' }),
	name: z.string(),
	password: z.string(),
})
