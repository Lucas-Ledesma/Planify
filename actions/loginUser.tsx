import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas'
import { User } from '@/type'
import axios from 'axios'
import { AuthError } from 'next-auth'
import { z } from 'zod'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user/login`

const loginUser = async ({
	email,
	password,
}: {
	email: string
	password: string
}): Promise<User> => {
	const res = await axios.post(`${URL}`, {
		email,
		password,
	})

	return res.data.user
}

export default loginUser
