'use server'

import { auth } from '@/auth'
import { InputType, ReturnType } from './type'
import axios from 'axios'
import { createSafeAction } from '@/lib/create-safe-action'
import { CreateOrg } from './schema'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/organization`

const handler = async (
	data: InputType
): Promise<ReturnType> => {
	const session = await auth()

	if (!session || !session.user || !session.user.id) {
		return {
			error: 'Unauthorized',
		}
	}

	const { title } = data

	let response

	try {
		const res = await axios.post(`${URL}`, {
			title,
			email: session.user.email,
		})

		response = res.data
	} catch (error: any) {
		return { error: error.response.data.message }
	}

	return { data: response }
}

export const createOrganization = createSafeAction(
	CreateOrg,
	handler
)
