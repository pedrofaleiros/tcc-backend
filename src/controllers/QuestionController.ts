import { Request, Response } from "express";
import { QuestionService } from "../services/QuestionService";
import { QuestionServiceImpl } from "../services/impl/QuestionServiceImpl";
import { QuestionDTO } from "../models/dtos/QuestionDTO";

class QuestionController {

	private service: QuestionService
	constructor() {
		this.service = new QuestionServiceImpl()
		this.listQuestionsByLevel = this.listQuestionsByLevel.bind(this)
		this.listQuestionsByCategory = this.listQuestionsByCategory.bind(this)
		this.createQuestion = this.createQuestion.bind(this)
		this.deleteQuestion = this.deleteQuestion.bind(this)
	}

	async listQuestionsByLevel(req: Request, res: Response) {
		const level = req.query.level
		const response = await this.service.listQuestionsByLevel(level)
		return res.json({ questions: response })
	}

	async listQuestionsByCategory(req: Request, res: Response) {
		const category_id = req.query.category_id as string
		const response = await this.service.listQuestionsByCategory(category_id)
		return res.json({ questions: response })
	}

	async createQuestion(req: Request, res: Response) {
		const question = QuestionDTO.fromRequestBody(req.body)
		await this.service.createQuestion(question)
		return res.json({ status: 'created' })
	}

	async deleteQuestion(req: Request, res: Response) {
		const question_id = req.query.question_id as string;
		await this.service.deleteQuestion(question_id);
		return res.json({ status: 'deleted' })
	}

}
export { QuestionController }