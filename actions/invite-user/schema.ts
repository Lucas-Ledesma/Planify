import { z } from 'zod'

export const inviteSchema = z.object({
	id: z.string(),
	email: z
		.string({ required_error: 'Email is requiered' })
		.email({ message: 'Email must be in Email format' }),
	orgId: z.string(),
})
