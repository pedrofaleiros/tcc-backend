import { UserEntity } from "../entities/UserEntity"

interface Params {
	fullname: string
	username: string
	email: string
	password: string
}

class UserDTO {
	fullname: string
	username: string
	email: string
	password: string

	constructor(params: Params) {
		this.fullname = params.fullname
		this.username = params.username
		this.email = params.email
		this.password = params.password
	}

	static fromRequestBody(reqBody: any) {
		if (!reqBody.fullname) throw new Error('Fullname is required')
		if (!reqBody.username) throw new Error('Username is required')
		if (!reqBody.email) throw new Error('Email is required')
		if (!reqBody.password) throw new Error('Password is required')

		return new UserDTO({
			fullname: reqBody.fullname,
			username: reqBody.username,
			email: reqBody.email,
			password: reqBody.password,
		});
	}

	toEntity(hashPassword: string): UserEntity {
		return new UserEntity({
			id: null,
			fullname: this.fullname.trim(),
			username: this.username.trim(),
			email: this.email,
			password: hashPassword,
		})
	}
}

export { UserDTO }