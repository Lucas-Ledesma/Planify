'use server'

import { createSafeAction } from '@/lib/create-safe-action'

import { CreateBoard } from './schema'

import { InputType, ReturnType } from './type'
import { auth } from '@/auth'
import axios from 'axios'
import { createAuditLog } from '@/lib/create-audit-log'
import {
	hasAvailableCount,
	incrementAvailableCount,
} from '@/lib/org-limit'
import { checkSubscription } from '@/lib/subscription'
import { revalidatePath } from 'next/cache'

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

	const { title, image, orgId } = data

	const canCreate = await hasAvailableCount({ orgId })
	const isPro = await checkSubscription({ orgId })

	if (!canCreate && !isPro) {
		return {
			error:
				'You have reached you limit of free boards. Please upgrade to create more',
		}
	}

	const [
		imageId,
		imageThumbUrl,
		imageFullUrl,
		imageLinkHTML,
		imageUserName,
	] = image.split('|')

	if (
		!imageId ||
		!imageThumbUrl ||
		!imageFullUrl ||
		!imageUserName ||
		!imageLinkHTML
	) {
		return {
			error: 'Missing fields. Failed to create board.',
		}
	}

	let board

	try {
		const res = await axios.post(`${URL}`, {
			title,
			imageId,
			imageThumbUrl,
			imageFullUrl,
			imageLinkHTML,
			imageUserName,
			orgId,
		})

		board = res.data

		if (!isPro) {
			await incrementAvailableCount({ orgId })
		}

		await createAuditLog({
			action: 'CREATE',
			entityId: res.data.id,
			entityTitle: res.data.title,
			entityType: 'BOARD',
			orgId,
		})
	} catch (error) {
		return {
			error: 'Failed to create.',
		}
	}
	revalidatePath(`/organization/${orgId}`)
	return { data: board }
}

export const createBoard = createSafeAction(
	CreateBoard,
	handler
)
