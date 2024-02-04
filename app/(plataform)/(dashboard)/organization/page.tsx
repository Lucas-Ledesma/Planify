import getOrgByOwner from '@/actions/getOrgsByOwner'
import getUserByEmail from '@/actions/getUserByEmail'
import { getServerSession } from 'next-auth'
import OrgCard from '../_components/orgCard'

const OrgPage = async () => {
	const session = await getServerSession()
	const user = await getUserByEmail(session?.user?.email!)
	const orgs = await getOrgByOwner(user.id)

	return (
		<div className='h-full w-full relative bg-slate-100'>
			<OrgCard orgs={orgs} />
		</div>
	)
}

export default OrgPage
