'use client'

import OrgCard from '../_components/orgCard'
import { useEffect, useState } from 'react'
import { Org } from '@/type'
import { useSession } from 'next-auth/react'
import getOrg from '@/actions/getOrg'

const OrgPage = () => {
	const [orgs, setOrgs] = useState<Org[] | []>([])
	const [isLoading, setIsLoading] = useState(true)
	const { data: session } = useSession()

	useEffect(() => {
		const fetchData = async () => {
			if (session && session.user && session.user.id) {
				const orgsData = await getOrg({
					userId: session.user.id,
				})

				setOrgs(orgsData)
				setIsLoading(false)
			}
		}

		if (orgs.length === 0) {
			fetchData()
		}
	}, [session, orgs])

	return (
		<div className='h-full w-full relative'>
			<OrgCard orgs={orgs} isLoading={isLoading} />
		</div>
	)
}

export default OrgPage
