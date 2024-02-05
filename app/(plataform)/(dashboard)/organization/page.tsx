import getOrgByOwner from '@/actions/getOrgsByOwner'
import OrgCard from '../_components/orgCard'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const OrgPage = async () => {
	const session = await auth()
	if (!session || !session.user || !session.user.id) {
		return redirect('/')
	}

	console.log(session.user.id)
	const orgs = await getOrgByOwner(session.user.id)

	return (
		<div className='h-full w-full relative bg-slate-100'>
			<OrgCard orgs={orgs} />
		</div>
	)
}

export default OrgPage
