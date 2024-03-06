import { getLists } from '@/actions/get/getLists'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { ListContainer } from './_components/list-container'

interface BoardIdPageProps {
	params: {
		boardId: string
	}
}

const BoardIdPage = async ({
	params,
}: BoardIdPageProps) => {
	const session = await auth()

	if (!session || !session.user || !session.user.id) {
		return redirect('/')
	}

	const lists = await getLists({ boardId: params.boardId })

	return (
		<div className='p-4 h-full overflow-x-auto'>
			<ListContainer
				boardId={params.boardId}
				data={lists}
			/>
		</div>
	)
}

export default BoardIdPage
