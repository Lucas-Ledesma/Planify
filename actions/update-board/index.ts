'use server'

import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'

import { InputType, ReturnType } from './type'
import { auth } from '@/auth'
import axios from 'axios'
import { UpdateBoard } from './schema'
import getOrg from '../get/getOrg'
import { createAuditLog } from '@/lib/create-audit-log'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/board`

const handler = async (
	data: InputType
): Promise<ReturnType> => {
	const session = await auth()

	if (!session || !session.user || !session.user.id) {
		return {
			error: 'Unauthorized',
		}
	}

	const { title, id, orgId } = data

	let board

	try {
		const { data } = await axios.patch(`${URL}/${id}`, {
			title,
			orgId,
		})

		board = data

		const org = await getOrg({ boardId: id })

		await createAuditLog({
			action: 'UPDATE',
			entityId: board.id,
			entityTitle: board.title,
			entityType: 'BOARD',
			orgId: org[0].id,
		})
	} catch (error) {
		return {
			error: 'Failed to update.',
		}
	}

	revalidatePath(`/board/${id}`)
	return { data: board }
}

export const updateBoard = createSafeAction(
	UpdateBoard,
	handler
)
