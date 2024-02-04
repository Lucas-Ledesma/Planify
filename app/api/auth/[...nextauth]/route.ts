import axios from 'axios'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user`

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env
				.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	callbacks: {
		async signIn({ user }) {
			await axios.post(URL, user)

			return true
		},
	},
})

export { handler as GET, handler as POST }
