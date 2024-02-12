enum Role {
	ADMIN,
	GUEST,
}

export interface usersFromOrg {
	userId: string
	orgId: string
	role: string
	joined: string
	user: User
}

export interface Org {
	id: string
	title: string
	createdAt: string
	usersFromOrg: usersFromOrg[]
}

export interface User {
	id: string
	email: string
	image: string
	name: string
	password?: string
}

export interface Notification {
	id: string
	senderId: string
	receiverId: string
	organizationId: string
	status: string
	createdAt: Date
	organization: Organization
	receiver: Receiver
	sender: Receiver
}

export interface Organization {
	id: string
	title: string
	createdAt: string
}

export interface Receiver {
	id: string
	providerId: null | string
	password: string
	name: string
	email: string
	image: string
}
