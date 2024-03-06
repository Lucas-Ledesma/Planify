import { List } from '@/type'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/list`

interface Props {
	boardId?: string
}

export const getLists = async ({
	boardId,
}: Props): Promise<List[]> => {
	let requestURL = URL

	if (boardId) {
		const queryParams = {
			boardId,
		}
		const queryStrings = Object.entries(queryParams)
			.filter(([key, value]) => value !== undefined)
			.map(([key, value]) => `${key}=${value}`)

		const queryString = queryStrings.join('&')

		requestURL += `?${queryString}`
	}

	const res = await axios(requestURL)

	return res.data
}
