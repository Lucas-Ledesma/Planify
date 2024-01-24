'use client'

import { Button } from '@/components/ui/button'
import { Org } from '@/type'
import axios from 'axios'
import { ArrowRight } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

const OrgPage = () => {
	const [show, setShow] = useState(false)
	const [org, setOrg] = useState<Org | null>(null)
	const { data } = useSession()

	async function handleSubmit(
		e: React.FormEvent<HTMLFormElement>
	) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const name = formData.get('name')

		const res = await axios.post(
			'http://localhost:4000/organization',
			{ title: name, email: data?.user?.email }
		)

		setShow(false)
		setOrg(res.data)
	}

	return (
		<div className='h-full w-full relative bg-slate-100'>
			{!show ? (
				<article className='absolute justify-between flex-col p-10 bg-white inset-0 top-52 overflow-hidden mx-auto flex rounded-lg max-w-md h-80 shadow transition hover:shadow-lg'>
					<div>
						<h1 className=' font-bold text-2xl'>
							Select an organization
						</h1>
						<h2 className='text-neutral-400 text-sm'>
							to continue to Planify
						</h2>
					</div>
					<div className='flex justify-between items-center'>
						<Button
							className='w-full justify-between'
							variant={'outline'}
							asChild>
							<Link href={`/organization/${org?.id}`}>
								<h1 className='text-lg'>{org?.title}</h1>
								<ArrowRight className='size-6 text-neutral-400' />
							</Link>
						</Button>
					</div>
					<div className='flex items-end gap-4'>
						<div className='border-t w-full h-1/2'></div>
						<span className='text-sm'>or</span>
						<div className='border-t w-full h-1/2'></div>
					</div>
					<Button
						variant={'outline'}
						onClick={() => setShow(!show)}>
						Create an organization
					</Button>
				</article>
			) : (
				<form
					onSubmit={handleSubmit}
					id='FormElem'
					className='absolute justify-between flex-col p-10 bg-white inset-0 top-52 overflow-hidden mx-auto flex rounded-lg max-w-md h-80 shadow'>
					<div>
						<h1 className=' font-bold text-2xl'>
							Create Organization
						</h1>
						<h2 className='text-neutral-400 text-sm'>
							to continue to Planify
						</h2>
					</div>
					<label
						htmlFor='name'
						className='flex flex-col gap-4'>
						<span className='font-medium text-sm'>
							Organization Name
						</span>
						<input
							type='text'
							name='name'
							className='w-full border p-2 rounded-md focus:outline-none'
						/>
					</label>
					<div className='flex gap-4'>
						<Button variant={'ghost'}>Cancel</Button>
						<Button type='submit'>
							Create organization
						</Button>
					</div>
				</form>
			)}
		</div>
	)
}

export default OrgPage
