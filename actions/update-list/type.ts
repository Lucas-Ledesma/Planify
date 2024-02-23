import { z } from 'zod'

import { ActionState } from '@/lib/create-safe-action'

import { List } from '@/type'
import { UpdateList } from './schema'

export type InputType = z.infer<typeof UpdateList>
export type ReturnType = ActionState<InputType, List>
