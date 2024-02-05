'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useLocalStorage } from 'usehooks-ts'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Accordion } from '@/components/ui/accordion'

interface SidebarProps {
	storageKey?: string
}

export const Sidebar = ({
	storageKey = 't-sidebar-state',
}: SidebarProps) => {
	return <div>sideBar</div>
}
