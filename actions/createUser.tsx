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
}: UserProps): Promise<User> => {
	const res = await axios.post(`${URL}`, {
		email,
		name,
		password,
		image,
		providerId,
	})

	return res.data
}

export default createUser
