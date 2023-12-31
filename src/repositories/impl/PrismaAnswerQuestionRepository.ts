import { AnswerQuestionEntity } from "../../models/entities/AnswerQuestionEntity";
import { AnswerQuestionResponse } from "../../models/response/AnswerQuestionResponse";
import prismaClient from "../../prisma/PrismaClient";
import { generateAnswerQuestionId } from "../../utils/generateAnswerQuestionId";
import { AnswerQuestionRepository } from "../AnswerQuestionRepository";


class PrismaAnswerQuestionRepository implements AnswerQuestionRepository {

	async findAnsweredQuestion(user_id: string, question_id: string): Promise<AnswerQuestionResponse> {
		const response: AnswerQuestionResponse | null = await prismaClient.answerQuestion.findFirst({
			where: {
				user_id: user_id,
				question_id: question_id
			},
			select: this.answeredQuestionResponseParams
		})
		if (response == null) throw new Error("Questao nao respondida");
		return response
	}

	async answerQuestion(answerQuestion: AnswerQuestionEntity): Promise<AnswerQuestionResponse> {
		const id = generateAnswerQuestionId(answerQuestion.user_id, answerQuestion.question_id)

		if (await this.findAnswerQuestion(id)) {
			return await this.update(answerQuestion)
		} else {
			return await this.create(answerQuestion)
		}
	}

	private async create(answerQuestion: AnswerQuestionEntity): Promise<AnswerQuestionResponse> {
		const id = generateAnswerQuestionId(answerQuestion.user_id, answerQuestion.question_id)
		const value = await this.verifyAnswer(answerQuestion)

		const res: AnswerQuestionResponse = await prismaClient.answerQuestion.create({
			data: {
				id: id,
				correct: value,
				tries: 1,
				user_id: answerQuestion.user_id,
				question_id: answerQuestion.question_id,
				alternative_id: answerQuestion.alternative_id,
			},
			select: this.answeredQuestionResponseParams
		})

		return res
	}

	private async update(answerQuestion: AnswerQuestionEntity): Promise<AnswerQuestionResponse> {
		const id = generateAnswerQuestionId(answerQuestion.user_id, answerQuestion.question_id)

		const answered: AnswerQuestionResponse = await this.getAnswerQuestion(id)
		if (answered.correct) throw new Error("Questao ja foi respondida corretamente pelo usuario");

		const value = await this.verifyAnswer(answerQuestion)
		const res: AnswerQuestionResponse = await prismaClient.answerQuestion.update({
			where: { id: id },
			data: {
				tries: answered.tries + 1,
				correct: value,
				alternative_id: answerQuestion.alternative_id
			},
			select: this.answeredQuestionResponseParams
		})

		return res
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
		return response == null ? false : response.value
	}

	private async getAnswerQuestion(id: string): Promise<AnswerQuestionResponse> {
		const res = await prismaClient.answerQuestion.findUnique({
			where: { id: id },
			select: this.answeredQuestionResponseParams
		})
		if (!res) throw new Error("Questao nao respondida");
		return res
	}

	private async findAnswerQuestion(id: string): Promise<boolean> {
		const res = await prismaClient.answerQuestion.count({
			where: { id: id }
		})
		return res == 1
	}

	async listUserAnsweredQuestions(user_id: string): Promise<AnswerQuestionResponse[]> {
		const answeredQuestions: AnswerQuestionResponse[] = await prismaClient.answerQuestion.findMany({
			where: {
				user_id: user_id
			},
			select: this.answeredQuestionResponseParams
		})

		return answeredQuestions
	}

	private answeredQuestionResponseParams = {
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
}

export { PrismaAnswerQuestionRepository }