import { Request, Response, response } from "express";
import { QuestionService } from "../services/QuestionService";
import { QuestionServiceImpl } from "../services/impl/QuestionServiceImpl";
import { QuestionDTO } from "../models/dtos/QuestionDTO";

class QuestionController {

	private service: QuestionService
	constructor() {
		this.service = new QuestionServiceImpl()
		this.createQuestion = this.createQuestion.bind(this)
		this.deleteQuestion = this.deleteQuestion.bind(this)
		this.listQuestions = this.listQuestions.bind(this)
		this.updateQuestionCategory = this.updateQuestionCategory.bind(this)
	}

	async updateQuestionCategory(req: Request, res: Response) {
		const category_id = req.query.category_id as string
		const question_id = req.query.question_id as string
		await this.service.updateQuestionCategory(question_id, category_id)
		return res.json({ status: 'atualizado' })
	}

	async listQuestions(req: Request, res: Response) {
		const level = req.query.level
		const category_id = req.query.category_id as string
		const response = await this.service.listQuestions(category_id, level);
		return res.json({
			length: response.length,
			data: response
		})
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