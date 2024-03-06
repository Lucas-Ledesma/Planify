import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/organization/subscription`

export const checkSubscription = async ({
	orgId,
}: {
	orgId: string
}) => {
	if (!orgId) {
		return false
	}

	const { data } = await axios(`${URL}/${orgId}`)

	return data
}
