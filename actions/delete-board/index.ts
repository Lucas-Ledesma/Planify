'use server'

import { auth } from '@/auth'
import { InputType, ReturnType } from './type'
import axios from 'axios'
import { createSafeAction } from '@/lib/create-safe-action'
import { revalidatePath } from 'next/cache'
import { DeleteBoard } from './schema'

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
