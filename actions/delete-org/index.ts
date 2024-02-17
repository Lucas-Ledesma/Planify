'use server'

import { auth } from '@/auth'
import { InputType, ReturnType } from './type'
import axios from 'axios'
import { createSafeAction } from '@/lib/create-safe-action'
import { DeleteOrg } from './schema'
import { revalidatePath } from 'next/cache'

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

	const { id } = data

	let response

	try {
		const { data: deleteResponse } = await axios.delete(
			`${URL}/${id}`
		)

		const { data: allOrgs } = await axios(
			`${URL}/user/${session.user.id}`
		)

		if (allOrgs.length === 0) {
			return { data: { msg: 'redirect' } }
		}

		revalidatePath(`/organization/${id}/settings`)
		response = { msg: `${allOrgs[0].id}` }
	} catch (error: any) {
		console.log(error)

		return { error: error.response.data.message }
	}

	return { data: response }
}

export const deleteOrganization = createSafeAction(
	DeleteOrg,
	handler
)
