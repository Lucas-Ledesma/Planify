import { z } from 'zod'

import { ActionState } from '@/lib/create-safe-action'
import { LoginUser } from './schema'

export type InputType = z.infer<typeof LoginUser>
export type ReturnType = ActionState<
	InputType,
	{ msg: string }
>
