import { UserEntity } from "../../models/entities/UserEntity";
import prismaClient from "../../prisma/PrismaClient";
import { UserRepository } from "../UserRepository";

class UserRepositoryImpl implements UserRepository {

	async getUserDetailsByUsername(username: string): Promise<UserEntity> {
		const user = await prismaClient.user.findUnique({
			where: {
				username: username
			},
			select: {
				id: true,
				username: true,
				fullname: true,
				email: true,
				password: true,
			}
		})

		if (user == null) throw new Error("User not found")

		return new UserEntity({
			id: user?.id,
			username: user?.username,
			fullname: user?.fullname,
			email: user?.email,
			password: user?.password,
		})
	}

	async createUser(user: UserEntity): Promise<string> {
		try {
			await prismaClient.user.create({
				data: {
					fullname: user.fullname,
					username: user.username,
					email: user.email,
					password: user.password,
				}
			})
			return "created"
		} catch (error) {
			throw new Error("Erro creating user");
		}
	}

	private async updateUser(user: UserEntity): Promise<string> {
		try {
			await prismaClient.user.update({
				data: {
					fullname: user.fullname,
					username: user.username,
					email: user.email,
				},
				where: {
					id: user.id!
				}
			})
			return "updated"
		} catch (error) {
			throw new Error("Erro updating user");
		}
	}
}

export { UserRepositoryImpl }