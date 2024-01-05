import { Request, Response } from "express";
import { AnswerQuestionService } from "../services/AnswerQuestionService";
import { AnswerQuestionServiceImpl } from "../services/impl/AnswerQuestionServiceImpl";
import { AnswerQuestionDTO } from "../models/dtos/AnswerQuestionDTO";

class AnswerQuestionController {

	private service: AnswerQuestionService

	constructor() {
		this.service = new AnswerQuestionServiceImpl()
		this.answerQuestion = this.answerQuestion.bind(this)
		this.getUserAnsweredQuestions = this.getUserAnsweredQuestions.bind(this)
		this.getUserAnsweredQuestionsByLevel = this.getUserAnsweredQuestionsByLevel.bind(this)
		this.getUserAnsweredQuestionsByCategory = this.getUserAnsweredQuestionsByCategory.bind(this)
	}

	async answerQuestion(req: Request, res: Response) {
		const user_id = req.user_id
		const answerQuestion = AnswerQuestionDTO.fromRequestBody(req.body, user_id)
		const response = await this.service.answerQuestion(answerQuestion)
		return res.json({
			data: response,
		})
	}

	async getUserAnsweredQuestions(req: Request, res: Response) {
		const user_id = req.user_id
		const response = await this.service.listUserAnsweredQuestions(user_id)
		return res.json({
			length: response.length,
			data: response
		})
	}

	async getUserAnsweredQuestionsByLevel(req: Request, res: Response) {
		const user_id = req.user_id
		const level = req.query.level;
		const response = await this.service.listUserAnsweredQuestionsByLevel(user_id, level)
		return res.json({
			length: response.length,
			data: response
		})
	}

	async getUserAnsweredQuestionsByCategory(req: Request, res: Response) {
		const user_id = req.user_id
		const category_id = req.query.category_id
		const response = await this.service.listUserAnsweredQuestionsByCategory(user_id, category_id)
		return res.json({
			length: response.length,
			data: response
		})
	}
}

export { AnswerQuestionController }