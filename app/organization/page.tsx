import OrgCard from './_components/orgCard'
import getOrgByOwner from '@/actions/getOrgsByOwner'
import getUserByEmail from '@/actions/getUserByEmail'
import { getServerSession } from 'next-auth'

const OrgPage = async () => {
	const session = await getServerSession()
	const user = await getUserByEmail(session?.user?.email!)
	const orgs = await getOrgByOwner(user.id)

	// async function handleSubmit(
	// 	e: React.FormEvent<HTMLFormElement>
	// ) {
	// 	e.preventDefault()
	// 	const formData = new FormData(e.currentTarget)
	// 	const name = formData.get('name')

	// 	const res = await axios.post(
	// 		'http://localhost:4000/organization',
	// 		{ title: name, email: data?.user?.email }
	// 	)

	// 	setShow(false)
	// 	setOrg(res.data)
	// }

	return (
		<div className='h-full w-full relative bg-slate-100'>
			<OrgCard orgs={orgs} />
		</div>
	)
}

export default OrgPage
