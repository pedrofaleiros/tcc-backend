import { Request, Response } from "express";
import { QuestionService } from "../services/QuestionService";
import { QuestionDTO } from "../models/dtos/QuestionDTO";

export class QuestionController {

	private service = new QuestionService()

	constructor() {
		this.createQuestion = this.createQuestion.bind(this)
		this.listQuestions = this.listQuestions.bind(this)
		this.deleteQuestion = this.deleteQuestion.bind(this)
	}

	async createQuestion(req: Request, res: Response) {
		const question = QuestionDTO.fromRequestBody(req.body)
		await this.service.createQuestion(question)
		return res.json({ status: 'criado com sucesso' })
	}

	async deleteQuestion(req: Request, res: Response) {
		const id = req.query.questionId
		await this.service.deleteQuestion(id)
		return res.json({ status: 'deletado com sucesso' })
	}

	async listQuestions(req: Request, res: Response) {
		const level = req.query.level
		const subjectId = req.query.subjectId
		const data = await this.service.listQuestions(subjectId, level)
		return res.json({
			length: data.length,
			data: data
		})
	}
}