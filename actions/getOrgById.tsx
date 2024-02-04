import { Org } from '@/type'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/organization`

const getOrgById = async (id: string): Promise<Org> => {
	const res = await axios(`${URL}/${id}`)

	return res.data
}

export default getOrgById
