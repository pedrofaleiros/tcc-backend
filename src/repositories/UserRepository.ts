import { UserEntity } from "../models/entities/UserEntity"

interface UserRepository {
	createUser(user: UserEntity): Promise<string>
	getUserDetailsByUsername(username: string): Promise<UserEntity>
}

export { UserRepository }