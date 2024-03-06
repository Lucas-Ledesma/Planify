import { z } from 'zod'
import { ActionState } from '@/lib/create-safe-action'
import { LeaveOrg } from './schema'
import { Org } from '@/type'

export type InputType = z.infer<typeof LeaveOrg>
export type ReturnType = ActionState<InputType, Org[]>
