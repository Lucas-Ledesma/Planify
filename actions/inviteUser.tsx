import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/organization/invite`

const inviteUser = async (
	id: string | undefined,
	orgId: string
) => {
	try {
		const res = await axios.post(`${URL}`, {
			id,
			orgId,
		})

		return res.data
	} catch (error) {
		console.log(error)
	}
}

export default inviteUser
