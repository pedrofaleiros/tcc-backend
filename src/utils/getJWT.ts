import { sign } from "jsonwebtoken";
import { UserEntity } from "../models/entities/UserEntity";

export function getJWT(user: UserEntity): string {
	const jwtSecret = process.env.JWT_SECRET

	if (jwtSecret == undefined) {
		throw new Error('Erro no servidor: JWT')
	}
	
	if(user.id == null){
		throw new Error('Erro no servidor')
	}

	return sign(
		{
			name: user.username,
		},
		jwtSecret,
		{
			subject: user.id!,
			expiresIn: '30d'
		}
	);
}