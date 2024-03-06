import { z } from 'zod'

import { ActionState } from '@/lib/create-safe-action'
import { inviteSchema } from './schema'
import { User } from '@/type'

export type InputType = z.infer<typeof inviteSchema>
export type ReturnType = ActionState<InputType, User>
