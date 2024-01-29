import { create } from 'zustand'

interface User {
	id: string
	name: string
	image: string
	email: string
}

interface State {
	user: User
	setUser: (user: User) => void
}

export const useUserStore = create<State>(() => {
	return {
		user: { email: '', id: '', image: '', name: '' },

		setUser: (user) => {
			console.log(user)
		},
	}
})
