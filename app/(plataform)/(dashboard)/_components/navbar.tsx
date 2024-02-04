import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import OrgSwitcher from './orgSwitcher'
import { getServerSession } from 'next-auth'
import getUserByEmail from '@/actions/getUserByEmail'
import getOrgByOwner from '@/actions/getOrgsByOwner'
import AuthButton from '@/components/authButton'

async function Navbar({
	organizationId,
}: {
	organizationId: string
}) {
	const session = await getServerSession()
	const user = await getUserByEmail(session?.user?.email!)
	const orgs = await getOrgByOwner(user.id)

	return (
		<nav className='fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center'>
			<div className='flex items-center gap-x-4'>
				<div className='hidden md:flex'>
					<Logo />
				</div>
				<Button className='rounded-sm h-auto hidden md:block'>
					Create
				</Button>
				<Button
					size={'sm'}
					className='rounded-sm block md:hidden'>
					<Plus className='size-4' />
				</Button>
			</div>
			<div className='ml-auto flex items-center gap-x-2'>
				<OrgSwitcher
					orgs={orgs}
					currentOrgId={organizationId}
				/>
				<AuthButton looged={!session} />
			</div>
		</nav>
	)
}

export default Navbar
