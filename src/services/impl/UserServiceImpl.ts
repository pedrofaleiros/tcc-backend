import { compare, hash } from "bcryptjs";
import { UserDTO } from "../../models/dtos/UserDTO";
import { UserRepository } from "../../repositories/UserRepository";
import { UserRepositoryImpl } from "../../repositories/impl/UserRepositoryImpl";
import { UserService } from "../UserService";
import { validateUser } from "../../utils/validateUser";
import { getJWT } from "../../utils/getJWT";
import prismaClient from "../../prisma/PrismaClient";
import { UserResponse } from "../../models/response/UserResponse";

class UserServiceImpl implements UserService {
	repository: UserRepository

	constructor() {
		this.repository = new UserRepositoryImpl()
	}

	async authUser(username: string | null, password: string | null): Promise<UserResponse> {
		if (username == null || password == null) {
			throw new Error("Request invalido");
		}

		const user = await this.repository.getUserDetailsByUsername(username)

		const passwordMathes = await compare(password, user.password)
		if (passwordMathes) {
			const token = getJWT(user)
			return new UserResponse({
				fullname: user.fullname,
				username: user.username,
				email: user.email,
				token: token,
			})
		}
		throw new Error("Senha incorreta");
	}

	async createUser(user: UserDTO): Promise<string> {
		validateUser(user)

		if (await this.repository.findUserByUserName(user.username)) throw new Error('Username ja cadastrado')
		if (await this.repository.findUserByEmail(user.email)) throw new Error('Email ja cadastrado')

		const hashPassword = await hash(user.password, 8)
		return await this.repository.createUser(user.toEntity(hashPassword))
	}

	async listUsers(): Promise<any> {
		return await prismaClient.user.findMany({
			select: {
				username: true
			}
		})
	}
}

export { UserServiceImpl }