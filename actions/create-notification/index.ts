'use server'

import { auth } from '@/auth'
import { InputType, ReturnType } from './type'
import axios from 'axios'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/create-safe-action'
import { CreateNotification } from './schema'

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

	const { email, id, orgId } = data

	let notification

	try {
		const res = await axios.post(`${URL}`, {
			email,
			orgId,
			id,
		})

		notification = res.data
	} catch (error: any) {
		return { error: error.response.data.message }
	}

	revalidatePath(`/organization/${orgId}`)
	return { data: notification }
}

export const createNotification = createSafeAction(
	CreateNotification,
	handler
)
