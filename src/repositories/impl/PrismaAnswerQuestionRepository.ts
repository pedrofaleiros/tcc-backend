import { AnswerQuestionEntity } from "../../models/entities/AnswerQuestionEntity";
import { AnswerQuestionResponse } from "../../models/response/AnswerQuestionResponse";
import prismaClient from "../../prisma/PrismaClient";
import { generateAnswerQuestionId } from "../../utils/generateAnswerQuestionId";
import { AnswerQuestionRepository } from "../AnswerQuestionRepository";

class PrismaAnswerQuestionRepository implements AnswerQuestionRepository {
	async answerQuestion(answerQuestion: AnswerQuestionEntity): Promise<string> {
		const id = generateAnswerQuestionId(answerQuestion.user_id, answerQuestion.question_id)

		if (await this.findAnswerQuestion(id)) {
			return await this.update(answerQuestion)
		} else {
			return await this.create(answerQuestion)
		}
	}

	private async create(answerQuestion: AnswerQuestionEntity): Promise<string> {
		const id = generateAnswerQuestionId(answerQuestion.user_id, answerQuestion.question_id)
		const value = await this.verifyAnswer(answerQuestion)

		await prismaClient.answerQuestion.create({
			data: {
				id: id,
				correct: value,
				tries: 1,
				user_id: answerQuestion.user_id,
				question_id: answerQuestion.question_id,
				alternative_id: answerQuestion.alternative_id,
			}
		})

		return value ? "correct answer" : "incorrect answer"
	}

	private async update(answerQuestion: AnswerQuestionEntity): Promise<string> {
		const id = generateAnswerQuestionId(answerQuestion.user_id, answerQuestion.question_id)
		const value = await this.verifyAnswer(answerQuestion)

		const answered = await prismaClient.answerQuestion.findUnique({
			where: {
				id: id
			},
			select: {
				tries: true
			}
		})

		if (!answered) throw new Error("Erro respondendo questao")

		await prismaClient.answerQuestion.update({
			where: {
				id: id
			},
			data: {
				tries: answered.tries + 1,
				correct: value,
				alternative_id: answerQuestion.alternative_id
			}
		})

		return value ? "correct answer" : "incorrect answer"
	}

	private async verifyAnswer(answeredQuestion: AnswerQuestionEntity): Promise<boolean> {
		const response = await prismaClient.alternative.findUnique({
			where: {
				id: answeredQuestion.alternative_id
			},
			select: {
				value: true
			}
		})
		if (response) {
			return response.value
		}

		return false
	}

	private async findAnswerQuestion(id: string): Promise<boolean> {
		const res = await prismaClient.answerQuestion.findUnique({
			where: {
				id: id
			}
		})
		return res != null
	}

	async listUserAnsweredQuestions(user_id: string): Promise<AnswerQuestionResponse[]> {
		const answeredQuestions: AnswerQuestionResponse[] = await prismaClient.answerQuestion.findMany({
			where: {
				user_id: user_id
			},
			select: {
				tries: true,
				correct: true,
				alternative_id: true,
				question: {
					select: {
						id: true,
						image_url: true,
						content: true,
						level: true,
						alternatives: {
							select: {
								id: true,
								text: true
							}
						}
					}
				}
			}
		})

		return answeredQuestions
	}
}

export { PrismaAnswerQuestionRepository }