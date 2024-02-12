import { Org } from '@/type'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/organization/user`

const getOrgByUser = async (
	userId: string | undefined
): Promise<Org[]> => {
	const res = await axios(`${URL}/${userId}`)

	return res.data
}

export default getOrgByUser
