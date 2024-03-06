import { Board } from '@/type'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/board`

interface Props {
	boardId?: string
	orgId?: string
}

const getBoards = async ({
	boardId,
	orgId,
}: Props): Promise<Board[]> => {
	let requestURL = URL

	if (boardId || orgId) {
		const queryParams = {
			boardId,
			orgId,
		}
		const queryStrings = Object.entries(queryParams)
			.filter(([key, value]) => value !== undefined)
			.map(([key, value]) => `${key}=${value}`)

		const queryString = queryStrings.join('&')

		requestURL += `?${queryString}`
	}

	const res = await axios.get(requestURL)

	return res.data
}

export default getBoards
