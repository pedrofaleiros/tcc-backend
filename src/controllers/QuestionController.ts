import { Request, Response } from "express";
import { QuestionService } from "../services/QuestionService";
import { QuestionServiceImpl } from "../services/impl/QuestionServiceImpl";
import { QuestionDTO } from "../models/dtos/QuestionDTO";
import prismaClient from "../prisma/PrismaClient";
import { AlternativeServiceImpl } from "../services/impl/AlternativeServiceImpl";
import { AlternativeDTO } from "../models/dtos/AlternativeDTO";

class QuestionController {

	private service: QuestionService
	constructor() {
		this.service = new QuestionServiceImpl()
		this.createQuestion = this.createQuestion.bind(this)
		this.listQuestionsByLevel = this.listQuestionsByLevel.bind(this)
		this.createCompleteQuestion = this.createCompleteQuestion.bind(this)
	}

	async createQuestion(req: Request, res: Response) {
		const question = QuestionDTO.fromRequestBody(req.body)
		const response = await this.service.createQuestion(question)
		return res.json({ status: response })
	}

	async listQuestionsByLevel(req: Request, res: Response) {
		const level = req.query.level
		const response = await this.service.listQuestionsByLevel(level)
		return res.json({ data: response })
	}

	//gambiarra
	async createCompleteQuestion(req: Request, res: Response) {
		console.log("\n\nCriando Question...")
		const question = QuestionDTO.fromRequestBody(req.body)

		const question_id = await prismaClient.question.create({
			data: {
				content: question.content,
				level: question.level,
				image_url: null,
			},
			select: {
				id: true
			}
		})
		
		const altServ = new AlternativeServiceImpl()
		const alts: Array<AlternativeDTO> = []
		
		const list = req.body.alternatives as Array<{ text: string, value: boolean }>
		list.forEach((e) => {
			let aux = new AlternativeDTO({
				text: e.text,
				value: e.value,
				question_id: question_id.id
			})
			alts.push(aux)
		})
		
		alts.forEach(async (e) => {
			console.log(await altServ.createAlternative(e))
		})
		
		console.log(question_id.id)
		return res.json({ question_id: question_id.id })
	}
}
export { QuestionController }