import { z } from 'zod'

export const DeleteNotification = z.object({
	id: z.string(),
})
