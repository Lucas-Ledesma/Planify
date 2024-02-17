import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/organization/invite`

const inviteUser = async (
	email: string | undefined,
	orgId: string | undefined,
	id: string | undefined
) => {
	try {
		const res = await axios.post(`${URL}`, {
			email,
			orgId,
			id,
		})

		return res.data
	} catch (error: any) {
		return { error: error.response.data.message }
	}
}

export default inviteUser
