'use server'

import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'

import { DeleteList } from './schema'
import { InputType, ReturnType } from './type'
import { auth } from '@/auth'
import axios from 'axios'
import getOrg from '../get/getOrg'
import { createAuditLog } from '@/lib/create-audit-log'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/list`

const handler = async (
	data: InputType
): Promise<ReturnType> => {
	const session = await auth()

	if (!session || !session.user || !session.user.id) {
		return {
			error: 'Unauthorized',
		}
	}

	const { id, boardId } = data
	let list

	try {
		const { data: deleteList } = await axios.delete(
			`${URL}/${id}`
		)

		const org = await getOrg({ boardId: id })

		await createAuditLog({
			action: 'DELETE',
			entityId: deleteList.id,
			entityTitle: deleteList.title,
			entityType: 'LIST',
			orgId: org[0].id,
		})

		data = deleteList
		revalidatePath(`/board/${boardId}`)
		return { data: list }
	} catch (error) {
		return {
			error: 'Failed to delete.',
		}
	}
}

export const deleteList = createSafeAction(
	DeleteList,
	handler
)
