import { z } from 'zod'

export const CreateOrg = z.object({
	title: z
		.string({
			required_error: 'title is requiered',
			invalid_type_error: 'title is requiered',
		})
		.min(3, { message: 'Title is too short' }),
})
