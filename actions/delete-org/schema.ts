import { z } from 'zod'

export const DeleteOrg = z.object({
	id: z.string(),
})
