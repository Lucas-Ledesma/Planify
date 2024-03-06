import { Org } from '@/type'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/organization`

interface Props {
	boardId?: string
	userId?: string
	email?: string
	orgId?: string
}

const getOrg = async ({
	boardId,
	email,
	orgId,
	userId,
}: Props): Promise<Org[]> => {
	let requestURL = URL

	if (boardId || email || orgId || userId) {
		const queryParams = {
			boardId,
			email,
			orgId,
			userId,
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

export default getOrg
