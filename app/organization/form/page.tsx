'use client'

import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Form = () => {
	const { data } = useSession()
	const [loading, setLoading] = useState(false)

	const router = useRouter()

	async function handleSubmit(
		e: React.FormEvent<HTMLFormElement>
	) {
		try {
			e.preventDefault()
			setLoading(true)
			const formData = new FormData(e.currentTarget)
			const name = formData.get('name')

			await axios.post(
				'http://localhost:4000/organization',
				{
					title: name,
					email: data?.user?.email,
				}
			)

			router.push('/organization')
		} catch (error) {
			alert(error)
			setLoading(false)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='h-full w-full relative bg-slate-100'>
			<form
				onSubmit={handleSubmit}
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
					<Button
						variant={'ghost'}
						onClick={() => router.push('/organization')}
						type='button'
						disabled={loading}>
						Cancel
					</Button>
					<Button type='submit' disabled={loading}>
						Create organization
					</Button>
				</div>
			</form>
		</div>
	)
}

export default Form
