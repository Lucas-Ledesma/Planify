import { z } from 'zod'

export const CreateNotification = z.object({
	id: z.string(),

	orgId: z.string(),

	email: z
		.string({
			required_error: 'email is requiered',
			invalid_type_error: 'email must be on a email format',
		})
		.email({ message: 'email must be on a email format' }),
})
