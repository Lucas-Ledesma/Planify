import NextAuth from 'next-auth'
import authConfig from './auth.config'
import getUserByEmail from './actions/get/getUserByEmail'
import createUser from './actions/createUser'

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth,
} = NextAuth({
	...authConfig,
	session: { strategy: 'jwt' },
	callbacks: {
		async signIn({ user, account }) {
			if (!user.email || !user.name || !user.image)
				return false

			if (account?.provider === 'credentails') {
			}

			const existingUser = await getUserByEmail(user.email)

			if (existingUser) return true

			await createUser({
				providerId: user.id,
				email: user.email,
				name: user.name,
				image: user.image,
			})

			return true
		},
		async session({ session, token }: any) {
			if (token && session.user) {
				session.user.id = token.id
			}

			return session
		},
		async jwt({ token }) {
			if (!token.email) return token

			const existingUser = await getUserByEmail(token.email)

			if (!existingUser) return token

			token.id = existingUser.id
			token.name = existingUser.name
			token.email = existingUser.email

			return token
		},
	},
})
