import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors'
import cors from 'cors'
import 'dotenv/config'
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { router } from "./routes";

const PORT = Number(process.env['PORT']) || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof Error) {
		if (err instanceof PrismaClientInitializationError || err.message.includes("prisma")) {
			if (err.message.includes("make sure your database server is running")) {
				return res.status(400).json("Error on Database")
			} else {
				console.log(err.message)
				return res.status(400).json("Error on Prisma")
			}
		}
		return res.status(400).json(err.message)
	}

	return res.status(500).json({
		status: 'error',
		message: 'Internal Server error'
	})
})

app.listen(PORT, () => {
	console.log('Server listening at ' + PORT)
})