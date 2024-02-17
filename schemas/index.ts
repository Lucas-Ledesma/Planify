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
	name: z.string().min(1, { message: 'Name is required' }),
	password: z
		.string()
		.min(1, { message: 'Password is required' }),
})

export const InviteSchema = z.object({
	email: z
		.string()
		.email({ message: 'Email is requiered' }),
})
