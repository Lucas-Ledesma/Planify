'use server'

import { createSafeAction } from '@/lib/create-safe-action'

import { CreateBoard } from './schema'

import { InputType, ReturnType } from './type'
import { auth } from '@/auth'
import axios from 'axios'

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
	} catch (error) {
		return {
			error: 'Failed to create.',
		}
	}

	return { data: board }
}

export const createBoard = createSafeAction(
	CreateBoard,
	handler
)
