import { compare, hash } from "bcryptjs";
import { UserDTO } from "../../models/dtos/UserDTO";
import { UserRepository } from "../../repositories/UserRepository";
import { UserRepositoryImpl } from "../../repositories/impl/UserRepositoryImpl";
import { UserService } from "../UserService";
import { validateUser } from "../../utils/validateUser";
import { getJWT } from "../../utils/getJWT";
import prismaClient from "../../prisma/PrismaClient";

class UserServiceImpl implements UserService {
	repository: UserRepository

	constructor() {
		this.repository = new UserRepositoryImpl()
	}

	async authUser(username: string | null, password: string | null): Promise<string> {
		if (username == null || password == null) {
			throw new Error("Invalid request");
		}

		const user = await this.repository.getUserDetailsByUsername(username)

		const passwordMathes = await compare(password, user.password)
		if (passwordMathes) {
			const token = getJWT(user)
			return token
		}
		throw new Error("Wrong password");
	}

	async createUser(user: UserDTO): Promise<string> {
		validateUser(user)
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