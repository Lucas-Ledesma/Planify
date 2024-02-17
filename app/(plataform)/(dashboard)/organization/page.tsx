'use client'

import getOrgByUser from '@/actions/getOrgsByUser'
import OrgCard from '../_components/orgCard'
import { useEffect, useState } from 'react'
import { Org } from '@/type'
import { useSession } from 'next-auth/react'

const OrgPage = () => {
	const [orgs, setOrgs] = useState<Org[] | []>([])
	const { data: session } = useSession()

	useEffect(() => {
		const fetchData = async () => {
			if (session && session.user && session.user.id) {
				const orgsData = await getOrgByUser(session.user.id)
				setOrgs(orgsData)
			}
		}

		if (orgs.length === 0) {
			fetchData()
		}
	}, [session, orgs])

	return (
		<div className='h-full w-full relative bg-slate-100'>
			<OrgCard orgs={orgs} />
		</div>
	)
}

export default OrgPage
