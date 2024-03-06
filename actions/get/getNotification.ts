import { Notification } from '@/type'
import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user/notification`

const getNoification = async (
	id: string | undefined
): Promise<Notification[] | []> => {
	const res = await axios(`${URL}/${id}`)

	return res.data
}

export default getNoification
