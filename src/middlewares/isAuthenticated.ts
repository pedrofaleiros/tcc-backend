import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "../prisma/PrismaClient";

interface Payload {
	sub: string
}

export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
	const authToken = req.headers.authorization

	if (authToken) {
		const [, token] = authToken.split(' ')
		try {
			const jwtSecret = process.env.JWT_SECRET
			if (jwtSecret == undefined) {
				throw new Error('Erro no servidor')
			}
			const { sub } = verify(
				token,
				jwtSecret
			) as Payload

			await verifyUserId(sub)

			req.user_id = sub
			return next()
		} catch (e) {
			return res.status(401).end()
		}
	}

	return res.status(401).end()
}

async function verifyUserId(user_id: string) {
	const user = await prismaClient.user.findUnique({
		where: {
			id: user_id
		}
	})

	if (!user) throw new Error("Usuario nao encontrado");
}