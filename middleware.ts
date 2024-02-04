export { default } from 'next-auth/middleware'

export const config = {
	matcher: ['/organization', '/organization/:path*'],
}
