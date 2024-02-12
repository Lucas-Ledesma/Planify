'use client'

import { Menu, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Sidebar } from './sidebar'
import Link from 'next/link'
import SidebarAcordeon from './sidebar-acordion'
import { Org } from '@/type'
import Image from 'next/image'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'

interface MobileSidebarProps {
	organizations: Org[]
	storageKey: string
}

const headingFont = localFont({
	src: '../../../../public/fonts/font.woff2',
})

export const MobileSidebar = ({
	organizations,
	storageKey,
}: MobileSidebarProps) => {
	const pathname = usePathname()
	const [isMounted, setIsMounted] = useState(false)

	const url = new URL(`http://localhost:3000/${pathname}`)

	const pathnameSegments = url.pathname.split('/')
	const organizationId =
		pathnameSegments[
			pathnameSegments.indexOf('organization') + 1
		]

	const onOpen = useMobileSidebar((state) => state.onOpen)
	const onClose = useMobileSidebar((state) => state.onClose)
	const isOpen = useMobileSidebar((state) => state.isOpen)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		onClose()
	}, [pathname, onClose])

	if (!isMounted) {
		return null
	}

	return (
		<>
			<Button
				onClick={onOpen}
				className='block md:hidden mr-2'
				variant='ghost'
				size='sm'>
				<Menu className='h-4 w-4' />
			</Button>
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent side='left' className='p-2 pt-10'>
					<>
						<Link href='/'>
							<div className='fixed top-2 left-2 hover:opacity-75 transition items-center gap-x-2 flex md:hidden'>
								<Image
									src='/logo.svg'
									alt='Logo'
									height={30}
									width={30}
								/>
								<p
									className={cn(
										'text-lg text-neutral-700 items-center pt-1',
										headingFont.className
									)}>
									Planify
								</p>
							</div>
						</Link>
						<div className='pb-2 pt-2'>
							<Button
								size='sm'
								asChild
								className='flex justify-between items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline'
								variant='ghost'>
								<Link href='/organization/form'>
									<span>Workspaces</span>
									<Plus className='h-4 w-4' />
								</Link>
							</Button>
						</div>
						<SidebarAcordeon
							organizations={organizations}
							storageKey={storageKey}
							activeOrganizationId={organizationId}
						/>
					</>
				</SheetContent>
			</Sheet>
		</>
	)
}
