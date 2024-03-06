'use server'

import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'

import { DeleteNotification } from './schema'
import { InputType, ReturnType } from './type'
import { auth } from '@/auth'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user/notification`

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
	let notificarion

	try {
		const { data: deleteNotification } = await axios.delete(
			`${URL}/${id}`
		)

		data = deleteNotification
	} catch (error) {
		return {
			error: 'Failed to delete.',
		}
	}

	return { data: notificarion }
}

export const deleteNotification = createSafeAction(
	DeleteNotification,
	handler
)
