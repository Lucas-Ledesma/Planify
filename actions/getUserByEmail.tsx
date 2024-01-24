import { User } from '@/type'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/users`

const getUserByEmail = async (
	email: string
): Promise<User> => {
	const res = await axios(`${URL}/?email=${email}`)

	return res.data
}

export default getUserByEmail
