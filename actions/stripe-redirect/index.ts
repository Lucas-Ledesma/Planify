'use server'

import { revalidatePath } from 'next/cache'

import { createSafeAction } from '@/lib/create-safe-action'

import { StripeRedirect } from './schema'

import { absoluteUrl } from '@/lib/utils'
import { InputType, ReturnType } from './type'
import { auth } from '@/auth'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/organization/stripeUrl`

const handler = async (
	data: InputType
): Promise<ReturnType> => {
	const session = await auth()

	if (!session || !session.user || !session.user.id) {
		return {
			error: 'Unauthorized',
		}
	}

	const { orgId } = data

	const settingsUrl = absoluteUrl(`/organization/${orgId}`)

	let url = ''

	try {
		const { data } = await axios.post(`${URL}`, {
			orgId,
			settingsUrl,
			userId: session.user.id,
		})

		url = data
	} catch (error) {
		return {
			error: 'Something went wrong!',
		}
	}

	revalidatePath(`/organization/${orgId}`)
	return { data: url }
}

export const stripeRedirect = createSafeAction(
	StripeRedirect,
	handler
)
