import { AuditLog } from '@/type'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/audit-log`

interface getAuditLogProps {
	cardId?: string
	orgId?: string
	size?: string
}

const getAuditLog = async ({
	cardId,
	orgId,
	size,
}: getAuditLogProps): Promise<AuditLog[]> => {
	try {
		let requestURL = URL

		if (cardId || orgId || size) {
			const queryParams = {
				cardId,
				orgId,
				size,
			}
			const queryStrings = Object.entries(queryParams)
				.filter(([key, value]) => value !== undefined)
				.map(([key, value]) => `${key}=${value}`)

			const queryString = queryStrings.join('&')

			requestURL += `?${queryString}`
		}

		const res = await axios.get(requestURL)

		return res.data
	} catch (error) {
		throw error
	}
}

export default getAuditLog
