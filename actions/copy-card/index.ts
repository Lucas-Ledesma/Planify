'use server'

import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'

import { auth } from '@/auth'
import { InputType, ReturnType } from './type'
import axios from 'axios'
import { CopyCard } from './schema'

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

	const { boardId, id } = data

	let card

	try {
		const res = await axios.post(`${URL}`, {
			id,
			boardId,
		})

		card = res.data
	} catch (error) {
		return {
			error: 'Failed to copy.',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: card }
}

export const copyCard = createSafeAction(CopyCard, handler)
