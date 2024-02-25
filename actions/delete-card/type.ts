import { z } from 'zod'

import { ActionState } from '@/lib/create-safe-action'
import { Card } from '@/type'
import { DeleteCard } from './schema'

export type InputType = z.infer<typeof DeleteCard>
export type ReturnType = ActionState<InputType, Card>
