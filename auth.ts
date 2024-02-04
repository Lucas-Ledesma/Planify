import NextAuth from 'next-auth'
import authConfig from './auth.config'

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth,
} = NextAuth({
	...authConfig,
	session: { strategy: 'jwt' },
	trustHost: true,
})
