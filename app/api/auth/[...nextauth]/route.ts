import axios from 'axios'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

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
			await axios.post('http://localhost:4000/user', user)

			return true
		},
	},
})

export { handler as GET, handler as POST }
