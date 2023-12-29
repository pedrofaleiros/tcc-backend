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
	}

	async answerQuestion(req: Request, res: Response) {
		const user_id = req.user_id
		const answerQuestion = AnswerQuestionDTO.fromRequestBody(req.body, user_id)
		const response = await this.service.answerQuestion(answerQuestion)
		return res.json({ status: response })
	}

	async getUserAnsweredQuestions(req: Request, res: Response) {
		const user_id = req.user_id
		const response = await this.service.listUserAnsweredQuestions(user_id)
		return res.json({ answered: response })
	}

	//TODO: getUserCorrectAnsweredQuestions

}

export { AnswerQuestionController }