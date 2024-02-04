import getOrgByOwner from '@/actions/getOrgsByOwner'
import getUserByEmail from '@/actions/getUserByEmail'
import OrgCard from '../_components/orgCard'
import { auth } from '@/auth'

const OrgPage = async () => {
	const session = await auth()
	const user = await getUserByEmail(session?.user?.email!)
	const orgs = await getOrgByOwner(user.id)

	return (
		<div className='h-full w-full relative bg-slate-100'>
			<OrgCard orgs={orgs} />
		</div>
	)
}

export default OrgPage
