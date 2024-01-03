import { UserEntity } from "../models/entities/UserEntity"

interface UserRepository {
	createUser(user: UserEntity): Promise<string>
	getUserDetailsByUsername(username: string): Promise<UserEntity>
	findUserByUserName(username: string): Promise<boolean>
	findUserByEmail(email: string): Promise<boolean>
}

export { UserRepository }