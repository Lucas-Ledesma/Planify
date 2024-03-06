import { z } from 'zod'

import { ActionState } from '@/lib/create-safe-action'
import { DeleteNotification } from './schema'

export type InputType = z.infer<typeof DeleteNotification>
export type ReturnType = ActionState<
	InputType,
	Notification
>
