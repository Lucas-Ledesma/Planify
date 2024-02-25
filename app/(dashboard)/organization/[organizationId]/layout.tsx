import { startCase } from 'lodash'

import Navbar from '../../_components/navbar'
import { Sidebar } from '../../_components/sidebar'
import getOrg from '@/actions/getOrg'
import { auth } from '@/auth'
import Noise from '@/components/noise'

export async function generateMetadata({
	params,
}: {
	params: { organizationId: string }
}) {
	const org = await getOrg({ orgId: params.organizationId })

	return {
		title: startCase(`${org[0]?.title}` || 'organization'),
	}
}

const OrganizationLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode
	params: { organizationId: string }
}) => {
	return (
		<div>
			<Navbar />
			<main className='pt-20 md:pt-24 bg-repeat px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto h-full '>
				<div className='flex gap-x-7'>
					<Noise />
					<div className='w-64 shrink-0 hidden md:block'>
						<Sidebar
							activeOrganizationId={params.organizationId}
						/>
					</div>
					{children}
				</div>
			</main>
		</div>
	)
}

export default OrganizationLayout
