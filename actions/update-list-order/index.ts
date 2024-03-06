'use server'

import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'

import { auth } from '@/auth'
import { InputType, ReturnType } from './type'
import axios from 'axios'
import { UpdateListOrder } from './schema'
import getOrg from '../get/getOrg'
import { createAuditLog } from '@/lib/create-audit-log'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/list/order`

const handler = async (
	data: InputType
): Promise<ReturnType> => {
	const session = await auth()

	if (!session || !session.user || !session.user.id) {
		return {
			error: 'Unauthorized',
		}
	}

	const { boardId, items } = data

	let list

	try {
		const res = await axios.patch(`${URL}`, {
			items,
			boardId,
		})

		list = res.data

		const org = await getOrg({ boardId })

		await createAuditLog({
			action: 'UPDATE',
			entityId: list.id,
			entityTitle: list.title,
			entityType: 'LIST',
			orgId: org[0].id,
		})
	} catch (error) {
		return {
			error: 'Failed to create.',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: list }
}

export const updateListOrder = createSafeAction(
	UpdateListOrder,
	handler
)
