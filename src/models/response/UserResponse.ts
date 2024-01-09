import { UserEntity } from "../entities/UserEntity"

interface Params {
	fullname: string
	username: string
	email: string
	token: string
}

class UserResponse {
	fullname: string
	username: string
	email: string
	token: string

	constructor(params: Params) {
		this.fullname = params.fullname
		this.username = params.username
		this.email = params.email
		this.token = params.token
	}
}

export { UserResponse }