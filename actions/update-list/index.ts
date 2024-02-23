'use server'

import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'

import { InputType, ReturnType } from './type'
import { auth } from '@/auth'
import axios from 'axios'
import { UpdateList } from './schema'

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

	const { id, boardId, title } = data
	let list

	try {
		const { data: updatedList } = await axios.patch(
			`${URL}/${id}`,
			{ title, boardId }
		)

		list = updatedList
		revalidatePath(`/board/${boardId}`)
		return { data: list }
	} catch (error) {
		return {
			error: 'Failed to update.',
		}
	}
}

export const updateList = createSafeAction(
	UpdateList,
	handler
)
