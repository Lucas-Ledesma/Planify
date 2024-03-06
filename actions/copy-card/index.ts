'use server'

import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'

import { auth } from '@/auth'
import { InputType, ReturnType } from './type'
import axios from 'axios'
import { CopyCard } from './schema'
import { createAuditLog } from '@/lib/create-audit-log'
import getOrg from '../get/getOrg'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/card/copy`

const handler = async (
	data: InputType
): Promise<ReturnType> => {
	const session = await auth()

	if (!session || !session.user || !session.user.id) {
		return {
			error: 'Unauthorized',
		}
	}

	const { boardId, id, title } = data

	let card

	try {
		const res = await axios.post(`${URL}`, {
			id,
			boardId,
		})

		card = res.data

		const org = await getOrg({ boardId })

		await createAuditLog({
			action: 'CREATE',
			entityId: res.data.id,
			entityTitle: res.data.title,
			entityType: 'CARD',
			orgId: org[0].id,
		})
	} catch (error) {
		return {
			error: 'Failed to copy.',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: card }
}

export const copyCard = createSafeAction(CopyCard, handler)
