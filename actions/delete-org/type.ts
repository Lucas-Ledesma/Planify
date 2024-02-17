import { z } from 'zod'
import { DeleteOrg } from './schema'
import { ActionState } from '@/lib/create-safe-action'

export type InputType = z.infer<typeof DeleteOrg>
export type ReturnType = ActionState<
	InputType,
	{ msg: string }
>
