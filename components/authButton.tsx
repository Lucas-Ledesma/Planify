'use client'

import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface authButtonPorps {
	looged: boolean
}

function AuthButton({ looged }: authButtonPorps) {
	return (
		<div>
			{looged ? (
				<Button size='sm' variant='ghost' asChild>
					<Link href={'/login'}>Login</Link>
				</Button>
			) : (
				<Button
					size='sm'
					variant='ghost'
					onClick={() => signOut({ callbackUrl: '/' })}>
					Logout
				</Button>
			)}
		</div>
	)
}

export default AuthButton
