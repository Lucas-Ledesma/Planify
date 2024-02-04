import { Org, User } from '@/type'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user`

interface UserProps {
	email: string
	name: string
	password: string
}

const createUser = async ({
	email,
	name,
	password,
}: UserProps): Promise<User> => {
	const res = await axios.post(`${URL}`, {
		email,
		name,
		password,
	})

	return res.data
}

export default createUser
