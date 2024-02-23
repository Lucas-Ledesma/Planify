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
import getOrg from '@/actions/getOrg'
import { redirect } from 'next/navigation'
import { Plus } from 'lucide-react'
import InviteForm from '@/app/(dashboard)/_components/invite-form'
import DeleteForm from '@/app/(dashboard)/_components/delete-form'
import { Separator } from '@/components/ui/separator'

const SettingsPage = async ({
	params,
}: {
	params: { organizationId: string }
}) => {
	const org = await getOrg({ orgId: params.organizationId })

	const users = org[0].usersFromOrg

	const session = await auth()

	if (!session || !session.user || !session.user.id) {
		return redirect('/')
	}

	const conectedUser = users.find(
		(user) => user.user.id === session?.user?.id
	)

	const isAdmin = conectedUser?.role === 'ADMIN'

	return (
		<Card className='w-full h-[600px] bg-primary-foreground shadow-md flex flex-col justify-between'>
			<div>
				<CardHeader>
					<h1 className='font-bold text-4xl'>Members</h1>
					<h2 className='text-neutral-500'>
						View and manage organization members
					</h2>
				</CardHeader>
				<Separator />
				<CardContent className='mt-4'>
					<div className='relative overflow-x-auto rounded-md'>
						<table className='w-full text-sm text-left rtl:text-right mb-8'>
							<thead className='text-xs uppercase bg-neutral-800'>
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

							<tbody>
								{users.map((user) => {
									return (
										<tr className='border-b'>
											<th
												scope='row'
												className='px-6 py-4 items-center flex gap-2 font-medium t whitespace-nowrap d'>
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
													org={org[0]}
													user={user}
													isAdmin={isAdmin}
												/>
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
						{isAdmin && (
							<InviteForm
								organizationId={params.organizationId}
								userId={session?.user?.id}
							/>
						)}
					</div>
				</CardContent>
			</div>

			<CardFooter className='flex justify-between w-full'>
				{isAdmin && (
					<footer className='w-full flex flex-col gap-4'>
						<div className='flex items-center gap-4 text-rose-500/70'>
							<div className='border-t w-[45%] bg-rose-500/70 h-1/2'></div>
							<span className='text-sm w-[12%]  text-center'>
								danger zone
							</span>
							<div className='border-t w-[45%] bg-rose-500/70 h-1/2'></div>
						</div>
						<div>
							<DeleteForm
								organizationId={params.organizationId}
								userId={session?.user?.id}
							/>
						</div>
					</footer>
				)}
			</CardFooter>
		</Card>
	)
}

export default SettingsPage
