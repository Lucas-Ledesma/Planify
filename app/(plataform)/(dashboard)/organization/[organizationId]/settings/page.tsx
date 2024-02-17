import getOrgById from '@/actions/getOrgById'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card'
import Image from 'next/image'
import RoleSwitcher from '../../../_components/role-switcher'
import { auth } from '@/auth'
import SettingsForm from '../../../_components/settings-form'

const SettingsPage = async ({
	params,
}: {
	params: { organizationId: string }
}) => {
	const org = await getOrgById(params.organizationId)

	const users = org.usersFromOrg

	const session = await auth()

	const conectedUser = users.find(
		(user) => user.user.id === session?.user?.id
	)

	const isAdmin = conectedUser?.role === 'ADMIN'

	return (
		<Card className='w-full h-[600px] shadow-md flex flex-col justify-between'>
			<div>
				<CardHeader>
					<h1 className='font-bold text-4xl'>Members</h1>
					<h2 className='text-neutral-500'>
						View and manage organization members
					</h2>
				</CardHeader>
				<CardContent>
					<div className='relative overflow-x-auto'>
						<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
							<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
								<tr>
									<th scope='col' className='px-6 py-3'>
										Members
									</th>
									<th scope='col' className='px-6 py-3'>
										joined
									</th>
									<th scope='col' className='px-6 py-3'>
										email
									</th>
									<th scope='col' className='px-6 py-3'>
										rol
									</th>
								</tr>
							</thead>
							{users.map((user) => {
								return (
									<tbody>
										<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
											<th
												scope='row'
												className='px-6 py-4 flex items-center gap-2 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
												<Image
													src={user.user.image}
													alt='user-image'
													width={30}
													height={30}
												/>
												{user.user.name}
											</th>
											<td className='px-6 py-4'>
												{user.joined}
											</td>
											<td className='px-6 py-4'>
												{user.user.email}
											</td>
											<td className='px-6 py-4'>
												<RoleSwitcher
													org={org}
													user={user}
													isAdmin={isAdmin}
												/>
											</td>
										</tr>
									</tbody>
								)
							})}
						</table>
					</div>
				</CardContent>
			</div>

			<CardFooter className='flex justify-between'>
				{isAdmin && (
					<SettingsForm
						organizationId={params.organizationId}
						userId={session?.user?.id}
					/>
				)}
			</CardFooter>
		</Card>
	)
}

export default SettingsPage
