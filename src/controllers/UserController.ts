import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserServiceImpl } from "../services/impl/UserServiceImpl";
import { UserDTO } from "../models/dtos/UserDTO";

class UserController {

	private service: UserService

	constructor() {
		this.service = new UserServiceImpl()
		this.createUser = this.createUser.bind(this)
		this.authUser = this.authUser.bind(this)
		this.listAllUsers = this.listAllUsers.bind(this)
	}

	async createUser(req: Request, res: Response) {
		const user = UserDTO.fromRequestBody(req.body)

		const response = await this.service.createUser(user)

		return res.json({ status: response })
	}

	async authUser(req: Request, res: Response) {
		const { username, password } = req.body

		const response = await this.service.authUser(username, password)

		return res.json(response)
	}

	async listAllUsers(req: Request, res: Response) {
		const users = await this.service.listUsers()
		return res.json({ users: users })
	}
}

export { UserController }