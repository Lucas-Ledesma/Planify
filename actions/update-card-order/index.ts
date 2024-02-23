'use server'

import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'

import { auth } from '@/auth'
import { InputType, ReturnType } from './type'
import axios from 'axios'
import { UpdateCardOrder } from './schema'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/card/order`

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

	let updatedCards

	try {
		console.log(items)

		const res = await axios.patch(`${URL}`, {
			items,
			boardId,
		})
		console.log(res.data)

		updatedCards = res.data
	} catch (error) {
		return {
			error: 'Failed to create.',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: updatedCards }
}

export const updateCardOrder = createSafeAction(
	UpdateCardOrder,
	handler
)
