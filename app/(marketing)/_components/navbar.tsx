'use client'

import AuthButton from '@/components/authButton'
import { Logo } from '@/components/logo'
import Notification from '@/components/notification'
import { Button } from '@/components/ui/button'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

export const Navbar = () => {
	const { data } = useSession()

	return (
		<nav className='fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center'>
			<div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
				<Logo />
				<div className='space-x-4 md:w-auto flex items-center justify-between w-full'>
					<AuthButton looged={!data} />

					{!data ? (
						<Button
							size='sm'
							onClick={() => signIn('google')}>
							Get Taskify for free
						</Button>
					) : (
						<Button size='sm' asChild>
							<Link href={'/organization'}>
								Go to Planify
							</Link>
						</Button>
					)}
				</div>
			</div>
		</nav>
	)
}
