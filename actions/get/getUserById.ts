import { User } from '@/type'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user`

const getUserById = async (
	id: string
): Promise<User | null> => {
	try {
		const res = await axios(`${URL}/${id}`)

		return res.data
	} catch (error) {
		return null
	}
}

export default getUserById
