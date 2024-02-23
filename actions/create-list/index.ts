'use server'

import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'

import { CreateList } from './schema'
import { auth } from '@/auth'
import { InputType, ReturnType } from './type'
import axios from 'axios'

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

	const { title, boardId } = data

	let list

	try {
		const res = await axios.post(`${URL}`, {
			title,
			boardId,
		})

		list = res.data
	} catch (error) {
		console.log(error)

		return {
			error: 'Failed to create.',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: list }
}

export const createList = createSafeAction(
	CreateList,
	handler
)
