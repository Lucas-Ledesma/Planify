import axios from 'axios'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user/notification`

const deleteNotificarion = async (
	id: string | undefined
) => {
	try {
		const res = await axios.delete(`${URL}/${id}`)

		return res.data
	} catch (error) {
		console.log(error)
	}
}

export default deleteNotificarion
