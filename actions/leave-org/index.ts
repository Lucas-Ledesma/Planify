'use server'

import { auth } from '@/auth'
import { InputType, ReturnType } from './type'
import axios from 'axios'
import { createSafeAction } from '@/lib/create-safe-action'
import { revalidatePath } from 'next/cache'
import { LeaveOrg } from './schema'
import getOrg from '../get/getOrg'

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

	const { orgId, userId } = data

	let response

	try {
		await axios.delete(`${URL}/${orgId}/user/${userId}`)

		const orgs = await getOrg({ userId })

		response = orgs
	} catch (error: any) {
		return { error: error.response.data.message }
	}

	revalidatePath(`/organization/${orgId}/settings`)
	return { data: response }
}

export const leaveOrganization = createSafeAction(
	LeaveOrg,
	handler
)
