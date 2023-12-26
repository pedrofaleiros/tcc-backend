import { UserDTO } from "../models/dtos/UserDTO";
import { UserRepository } from "../repositories/UserRepository";

interface UserService {
	repository: UserRepository
	createUser(user: UserDTO): Promise<string>
	listUsers(): Promise<any>
	authUser(username: string, password: string): Promise<string>
}

export { UserService }