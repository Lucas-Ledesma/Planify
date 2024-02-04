import { User } from '@/type'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user`

const getUserByEmail = async (
	email: string
): Promise<User> => {
	const res = await axios(`${URL}/?email=${email}`)
	console.log('a')

	return res.data
}

export default getUserByEmail
