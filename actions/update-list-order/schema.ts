import { z } from 'zod'

export const UpdateListOrder = z.object({
	items: z.array(
		z.object({
			id: z.string(),
			title: z.string(),
			order: z.number(),
			createdAt: z.string(),
			updatedAt: z.string(),
		})
	),
	boardId: z.string(),
})
