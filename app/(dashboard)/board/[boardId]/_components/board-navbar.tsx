import { Board } from '@/type'
import { BoardOptions } from './board-option'
import { BoardTitleForm } from './board-title-form'

interface BoardNavbarProps {
	data: Board
}

export const BoardNavbar = async ({
	data,
}: BoardNavbarProps) => {
	return (
		<div className='w-full h-14 z-[40] bg-black/50 top-14 fixed flex items-center px-6 gap-x-4 text-white'>
			<BoardTitleForm data={data} />
			<div className='ml-auto'>
				<BoardOptions id={data.id} />
			</div>
		</div>
	)
}
