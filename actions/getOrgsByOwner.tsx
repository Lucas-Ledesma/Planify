import { Org } from '@/type'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/organization`

const getOrgByOwner = async (
	ownerId: string
): Promise<Org[]> => {
	const res = await axios(`${URL}/${ownerId}`)

	return res.data
}

export default getOrgByOwner
