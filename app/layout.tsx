import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Provider } from './provider/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Planify',
	description: 'Planify the best task managment',
	icons: [{ url: '/logo.svg', href: '/logo.svg' }],
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Provider>{children}</Provider>
			</body>
		</html>
	)
}
