import { notFound, redirect } from 'next/navigation'

import { BoardNavbar } from './_components/board-navbar'
import getBoards from '@/actions/get/getBoards'
import Navbar from '../../_components/navbar'
import getOrg from '@/actions/get/getOrg'

export async function generateMetadata({
	params,
}: {
	params: { boardId: string }
}) {
	const board = await getBoards({ boardId: params.boardId })

	return {
		title: board[0]?.title || 'Board',
	}
}

const BoardIdLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode
	params: { boardId: string }
}) => {
	const board = await getBoards({ boardId: params.boardId })

	if (!board || board.length === 0) {
		return
	}

	const org = await getOrg({ orgId: board[0].orgId })

	return (
		<div
			className='relative h-full bg-no-repeat bg-cover bg-center'
			style={{
				backgroundImage: `url(${board[0].imageFullUrl})`,
			}}>
			<Navbar activeOrg={org[0]} />
			<BoardNavbar data={board[0]} />
			<div className='absolute inset-0 bg-black/10' />
			<main className='relative pt-28 h-full'>
				{children}
			</main>
		</div>
	)
}

export default BoardIdLayout
