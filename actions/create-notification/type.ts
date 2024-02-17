import { z } from 'zod'

import { ActionState } from '@/lib/create-safe-action'
import { CreateNotification } from './schema'

export type InputType = z.infer<typeof CreateNotification>
export type ReturnType = ActionState<
	InputType,
	{ msg: string }
>
