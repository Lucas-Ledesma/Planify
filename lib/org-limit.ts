import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/organization`

export const incrementAvailableCount = async ({
	orgId,
}: {
	orgId: string
}) => {
	if (!orgId) {
		throw new Error('Unauthorized')
	}

	await axios.post(`${URL}/increaseLimit`, { orgId })
}

export const decreaseAvailableCount = async ({
	orgId,
}: {
	orgId: string
}) => {
	if (!orgId) {
		throw new Error('Unauthorized')
	}

	await axios.post(`${URL}/decreaseLimit`, { orgId })
}

export const hasAvailableCount = async ({
	orgId,
}: {
	orgId: string
}) => {
	if (!orgId) {
		throw new Error('Unauthorized')
	}

	const { data } = await axios(`${URL}/count/${orgId}`)

	return data.hasAvailedCount
}

export const getAvailableCount = async ({
	orgId,
}: {
	orgId: string
}) => {
	if (!orgId) {
		throw new Error('Unauthorized')
	}

	const { data } = await axios(`${URL}/count/${orgId}`)

	return data.count
}
