import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user/role`

const changeRole = async ({
	userId,
	orgId,
	role,
}: {
	userId: string
	orgId: string
	role: 'ADMIN' | 'GUEST'
}) => {
	const res = await axios.post(`${URL}`, {
		userId,
		orgId,
		role,
	})

	return res.data
}

export default changeRole
