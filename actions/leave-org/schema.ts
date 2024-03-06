import { z } from 'zod'

export const LeaveOrg = z.object({
	userId: z.string(),

	orgId: z.string(),
})
