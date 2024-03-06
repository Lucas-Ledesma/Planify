'use server'

import { auth } from '@/auth'
import { InputType, ReturnType } from './type'
import axios from 'axios'
import { createSafeAction } from '@/lib/create-safe-action'
import { revalidatePath } from 'next/cache'
import { DeleteCard } from './schema'
import getOrg from '../get/getOrg'
import { createAuditLog } from '@/lib/create-audit-log'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/card`

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

	try {
		const { data: deleteCard } = await axios.delete(
			`${URL}/${id}`
		)

		const org = await getOrg({ boardId: id })

		await createAuditLog({
			action: 'DELETE',
			entityId: deleteCard.id,
			entityTitle: deleteCard.title,
			entityType: 'CARD',
			orgId: org[0].id,
		})

		revalidatePath(`/organization/${boardId}`)
		return { data: deleteCard }
	} catch (error: any) {
		console.log(error)

		return { error: error.response.data.message }
	}
}

export const deleteCard = createSafeAction(
	DeleteCard,
	handler
)
