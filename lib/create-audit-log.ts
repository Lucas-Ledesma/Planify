import getOrg from '@/actions/get/getOrg'
import { auth } from '@/auth'
import axios from 'axios'

interface Props {
	entityId: string
	entityType: 'BOARD' | 'LIST' | 'CARD'
	entityTitle: string
	action: 'CREATE' | 'DELETE' | 'UPDATE'
	orgId: string
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/audit-log`

export const createAuditLog = async (props: Props) => {
	try {
		const session = await auth()

		if (!session || !session.user?.id) {
			return { error: 'User not found' }
		}

		const user = session.user

		const {
			action,
			entityId,
			entityTitle,
			entityType,
			orgId,
		} = props

		await axios.post(`${URL}`, {
			action,
			entityId,
			entityTitle,
			entityType,
			user,
			orgId,
		})
	} catch (error) {
		console.log('[AUDIT_LOG_ERROR]', error)
	}
}
