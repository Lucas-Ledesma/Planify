'use client'

import {
	Dialog,
	DialogContent,
} from '@/components/ui/dialog'
import { useCardModal } from '@/hooks/use-card-modal'
import { fetcher } from '@/lib/fetcher'
import { Card } from '@/type'
import { useQuery } from '@tanstack/react-query'
import { Header } from './header'
import { Description } from './description'
import { Actions } from './actions'
import { Activity } from './activity'

export function CardModal() {
	const id = useCardModal((state) => state.id)
	const isOpen = useCardModal((state) => state.isOpen)
	const onClose = useCardModal((state) => state.onClose)

	const { data: cardData } = useQuery<Card>({
		queryKey: ['card', id],
		queryFn: () => {
			if (id === undefined) {
				return {} as Card
			}
			return fetcher(
				`${process.env.NEXT_PUBLIC_API_URL}/card/${id}`
			)
		},
	})

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				{cardData === undefined || !cardData.id ? (
					<Header.Skeleton />
				) : (
					<Header data={cardData} />
				)}
				<div className='grid grid-cols-1 md:grid-cols-4 md:gap-4'>
					<div className='col-span-3'>
						<div className='w-full space-y-6'>
							{cardData === undefined || !cardData.id ? (
								<Description.Skeleton />
							) : (
								<Description data={cardData} />
							)}

							{cardData === undefined || !cardData.id ? (
								<Activity.Skeleton />
							) : (
								<Activity card={cardData} />
							)}
						</div>
					</div>
					{!cardData ? (
						<Actions.Skeleton />
					) : (
						<Actions data={cardData} />
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
