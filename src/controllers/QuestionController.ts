import { Request, Response } from "express";
import { QuestionService } from "../services/QuestionService";
import { QuestionServiceImpl } from "../services/impl/QuestionServiceImpl";
import { QuestionDTO } from "../models/dtos/QuestionDTO";

class QuestionController {

	private service: QuestionService
	constructor() {
		this.service = new QuestionServiceImpl()
		this.createQuestion = this.createQuestion.bind(this)
		this.listQuestionsByLevel = this.listQuestionsByLevel.bind(this)
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
}
export { QuestionController }