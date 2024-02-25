'use server'

import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'

import { InputType, ReturnType } from './type'
import { auth } from '@/auth'
import axios from 'axios'
import { UpdateCard } from './schema'

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

	const { id, boardId, description, title } = data
	let card

	try {
		const { data: updatedCard } = await axios.patch(
			`${URL}/${id}`,
			{ boardId, description, title }
		)

		card = updatedCard
	} catch (error) {
		return {
			error: 'Failed to update.',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: card }
}

export const updateCard = createSafeAction(
	UpdateCard,
	handler
)
