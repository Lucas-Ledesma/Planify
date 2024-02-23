import { z } from 'zod'

import { ActionState } from '@/lib/create-safe-action'

import { CreateBoard } from './schema'
import { Board } from '@/type'

export type InputType = z.infer<typeof CreateBoard>
export type ReturnType = ActionState<InputType, Board>
