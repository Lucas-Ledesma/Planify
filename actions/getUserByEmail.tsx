import { User } from '@/type'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user`

const getUserByEmail = async (email: string) => {
	try {
		const res = await axios(`${URL}/?email=${email}`)

		return res.data
	} catch (error) {
		return null
	}
}

export default getUserByEmail
