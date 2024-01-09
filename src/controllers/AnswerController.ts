import { Request, Response } from "express";
import { AnswerDTO } from "../models/dtos/AnswerDTO";
import { AnswerService } from "../services/AnswerService";

export class AnswerController {

	private service = new AnswerService()

	constructor() {
		this.answerQuestion = this.answerQuestion.bind(this)
	}

	async answerQuestion(req: Request, res: Response) {
		const answer = AnswerDTO.fromRequestBody(req.body, req.user_id)
		const data = await this.service.answerQuestion(answer)
		return res.json({
			data: data
		})
	}
}