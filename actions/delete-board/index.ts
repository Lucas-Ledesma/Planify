'use server'

import { auth } from '@/auth'
import { InputType, ReturnType } from './type'
import axios from 'axios'
import { createSafeAction } from '@/lib/create-safe-action'
import { revalidatePath } from 'next/cache'
import { DeleteBoard } from './schema'
import { createAuditLog } from '@/lib/create-audit-log'
import getOrg from '../get/getOrg'
import { decreaseAvailableCount } from '@/lib/org-limit'
import { checkSubscription } from '@/lib/subscription'

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

	const { id } = data

	try {
		const { data: deleteBoard } = await axios.delete(
			`${URL}/${id}`
		)

		const org = await getOrg({ boardId: id })
		const isPro = await checkSubscription({
			orgId: org[0].id,
		})

		await createAuditLog({
			action: 'DELETE',
			entityId: deleteBoard.id,
			entityTitle: deleteBoard.title,
			entityType: 'BOARD',
			orgId: org[0].id,
		})

		if (!isPro) {
			await decreaseAvailableCount({ orgId: org[0].id })
		}

		revalidatePath(`/organization/${deleteBoard.orgId}`)
		return { data: { redirect: deleteBoard.orgId } }
	} catch (error: any) {
		console.log(error)

		return { error: error.response.data.message }
	}
}

export const deleteBoard = createSafeAction(
	DeleteBoard,
	handler
)
