interface Params {
	id: string | null
	fullname: string
	username: string
	email: string
	password: string
}

class UserEntity {
	id: string | null
	fullname: string
	username: string
	email: string
	password: string

	constructor(params: Params) {
		this.id = params.id
		this.fullname = params.fullname
		this.username = params.username
		this.email = params.email
		this.password = params.password
	}
}

export { UserEntity }