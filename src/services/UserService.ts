import { UserDTO } from "../models/dtos/UserDTO";
import { UserResponse } from "../models/response/UserResponse";
import { UserRepository } from "../repositories/UserRepository";

interface UserService {
	repository: UserRepository
	createUser(user: UserDTO): Promise<string>
	listUsers(): Promise<any>
	authUser(username: string, password: string): Promise<UserResponse>
}

export { UserService }