import { AnswerQuestionDTO } from "../../models/dtos/AnswerQuestionDTO";
import { AnswerQuestionResponse } from "../../models/response/AnswerQuestionResponse";
import { AnswerQuestionRepository } from "../../repositories/AnswerQuestionRepository";
import { PrismaAnswerQuestionRepository } from "../../repositories/impl/PrismaAnswerQuestionRepository";
import { AnswerQuestionService } from "../AnswerQuestionService";

class AnswerQuestionServiceImpl implements AnswerQuestionService {

	private repository: AnswerQuestionRepository

	constructor() {
		this.repository = new PrismaAnswerQuestionRepository()
	}

	async answerQuestion(answerQuestion: AnswerQuestionDTO): Promise<string> {
		//TODO: validacoes
		const response = await this.repository.answerQuestion(answerQuestion.toEntity())
		return response
	}

	async listUserAnsweredQuestions(user_id: string): Promise<AnswerQuestionResponse[]> {
		//TODO: verificar user_id existe
		const response = await this.repository.listUserAnsweredQuestions(user_id)
		return response
	}

}

export { AnswerQuestionServiceImpl }