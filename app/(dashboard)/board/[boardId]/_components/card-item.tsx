'use client'

import { Draggable } from '@hello-pangea/dnd'

import { useCardModal } from '@/hooks/use-card-modal'
import { Card } from '@/type'

interface CardItemProps {
	data: Card
	index: number
}

export const CardItem = ({
	data,
	index,
}: CardItemProps) => {
	const cardModal = useCardModal()

	return (
		<Draggable draggableId={data.id} index={index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					role='button'
					onClick={() => cardModal.onOpen(data.id)}
					className='truncate border-2 border-transparent hover:bg-neutral-600 py-2 px-3 text-sm bg-neutral-800 rounded-md shadow-sm'>
					{data.title}
				</div>
			)}
		</Draggable>
	)
}
