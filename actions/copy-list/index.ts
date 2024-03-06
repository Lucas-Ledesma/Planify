'use server'

import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'

import { auth } from '@/auth'
import { InputType, ReturnType } from './type'
import axios from 'axios'
import { CopyList } from './schema'
import { createAuditLog } from '@/lib/create-audit-log'
import getOrg from '../get/getOrg'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/list/copy`

const handler = async (
	data: InputType
): Promise<ReturnType> => {
	const session = await auth()

	if (!session || !session.user || !session.user.id) {
		return {
			error: 'Unauthorized',
		}
	}

	const { boardId, id } = data

	let list

	try {
		const res = await axios.post(`${URL}`, {
			id,
			boardId,
		})

		list = res.data

		const org = await getOrg({ boardId })

		await createAuditLog({
			action: 'CREATE',
			entityId: list.id,
			entityTitle: list.title,
			entityType: 'LIST',
			orgId: org[0].id,
		})
	} catch (error) {
		return {
			error: 'Failed to copy.',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: list }
}

export const copyList = createSafeAction(CopyList, handler)
