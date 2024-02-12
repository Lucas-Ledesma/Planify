import { User } from '@/type'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user`

interface UserProps {
	email: string
	name: string
	password?: string
	providerId?: string
	image?: string
}

const createUser = async ({
	email,
	name,
	password,
	image,
	providerId,
}: UserProps) => {
	try {
		await axios.post(`${URL}`, {
			email,
			name,
			password,
			image,
			providerId,
		})

		return { success: 'User created successfully' }
	} catch (error: any) {
		if (error.response.data.msg) {
			return { failure: 'Email already taken' }
		}
		return { failure: error }
	}
}

export default createUser
