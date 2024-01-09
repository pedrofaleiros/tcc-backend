import { AnswerDTO } from "../models/dtos/AnswerDTO";
import { AnswerRepository } from "../repositories/AnswerRepository";

export class AnswerService {

	private repository = new AnswerRepository()

	async answerQuestion(answer: AnswerDTO) {
		const question = await this.repository.findQuestion(answer.questionId, answer.alternativeId)
		if (question == null) throw new Error("Alternativa invalida")

		const value = await this.repository.verifyAnswer(answer.alternativeId)

		const userQuestion = await this.repository.findUserQuestion(answer.userId, answer.questionId)

		if (userQuestion == null) {
			await this.repository.answerQuestion(answer.toEntity(value, 1))
		} else {
			if (userQuestion.correct) throw new Error("Questao ja foi respondida corretamente")
			await this.repository.answerAgainQuestion(answer.toEntity(value, userQuestion.tries + 1), userQuestion.id)
		}

		return value
	}
}