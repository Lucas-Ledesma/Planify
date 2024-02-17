import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import OrgSwitcher from './orgSwitcher'
import getOrgByUser from '@/actions/getOrgsByUser'
import AuthButton from '@/components/authButton'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { MobileSidebar } from './mobile-sidebar'
import Notification from '@/components/notification'

async function Navbar() {
	const session = await auth()
	if (!session || !session.user || !session.user.id) {
		return redirect('/')
	}

	const orgs = await getOrgByUser(session.user.id)

	return (
		<nav className='fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center'>
			<MobileSidebar
				organizations={orgs}
				storageKey='t-mobile-sidebar-status'
			/>
			<div className='flex items-center gap-x-4'>
				<div className='hidden md:flex'>
					<Logo />
				</div>

				<Button
					asChild
					className='rounded-sm h-auto hidden md:block'>
					<Link href={'/organization/form'}>Create</Link>
				</Button>
				<Button
					asChild
					size={'sm'}
					className='rounded-sm flex md:hidden items-center'>
					<Link href={'/organization/form'}>
						<Plus className='size-4 items-center' />
					</Link>
				</Button>
			</div>
			<div className='ml-auto flex items-center gap-x-2'>
				{session?.user?.id && (
					<Notification id={session?.user?.id} />
				)}
				<OrgSwitcher orgs={orgs} />
				<AuthButton looged={!session} />
			</div>
		</nav>
	)
}

export default Navbar
