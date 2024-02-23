'use server'

import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'

import { auth } from '@/auth'
import { InputType, ReturnType } from './type'
import axios from 'axios'
import { CreateCard } from './schema'

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

	const { boardId, listId, title } = data

	let card

	try {
		const res = await axios.post(`${URL}`, {
			title,
			boardId,
			listId,
		})

		console.log(res.data)

		card = res.data
	} catch (error) {
		console.log(error)

		return {
			error: 'Failed to create.',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: card }
}

export const createCard = createSafeAction(
	CreateCard,
	handler
)
