import getOrgByUser from '@/actions/getOrgsByUser'
import OrgCard from '../_components/orgCard'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const OrgPage = async () => {
	const session = await auth()
	if (!session || !session.user || !session.user.id) {
		return redirect('/')
	}
	const orgs = await getOrgByUser(session.user.id)

	return (
		<div className='h-full w-full relative bg-slate-100'>
			<OrgCard orgs={orgs} />
		</div>
	)
}

export default OrgPage
