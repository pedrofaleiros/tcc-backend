import { AnswerQuestionEntity } from "../../models/entities/AnswerQuestionEntity";
import { AnswerQuestionResponse } from "../../models/response/AnswerQuestionResponse";
import prismaClient from "../../prisma/PrismaClient";
import { generateAnswerQuestionId } from "../../utils/generateAnswerQuestionId";
import { AnswerQuestionRepository } from "../AnswerQuestionRepository";

class PrismaAnswerQuestionRepository implements AnswerQuestionRepository {

	async answer(alternative_id: string): Promise<boolean> {
		const res = await prismaClient.alternative.findUnique({
			where: { id: alternative_id },
			select: { value: true }
		})
		return res == null ? false : res.value
	}

	async getAnsweredQuestion(user_id: string, question_id: string): Promise<AnswerQuestionResponse | null> {
		return await prismaClient.answerQuestion.findFirst({
			where: {
				user_id: user_id,
				question_id: question_id,
			},
			select: this.answerQuestionResponseInterface,
		})
	}

	async create(answer: AnswerQuestionEntity): Promise<void> {
		await prismaClient.answerQuestion.create({
			data: {
				correct: answer.correct,
				tries: answer.tries,
				user_id: answer.user_id,
				question_id: answer.question_id,
				alternative_id: answer.alternative_id,
			}
		})
	}

	async update(answer: AnswerQuestionEntity): Promise<void> {
		await prismaClient.answerQuestion.update({
			where: { id: answer.id ?? "" },
			data: {
				correct: answer.correct,
				tries: answer.tries,
				alternative_id: answer.alternative_id,
			}
		})
	}

	async listUserAnsweredQuestions(user_id: string): Promise<AnswerQuestionResponse[]> {
		return await prismaClient.answerQuestion.findMany({
			where: { user_id: user_id },
			select: this.answerQuestionResponseInterface
		})
	}

	async listUserAnsweredQuestionsByLevel(user_id: string, level: number): Promise<AnswerQuestionResponse[]> {
		return await prismaClient.answerQuestion.findMany({
			where: {
				user_id: user_id,
				question: { level: level }
			},
			select: this.answerQuestionResponseInterface
		})
	}

	async listUserAnsweredQuestionsByCategory(user_id: string, category_id: string): Promise<AnswerQuestionResponse[]> {
		return await prismaClient.answerQuestion.findMany({
			where: {
				user_id: user_id,
				question: { category_id: category_id }
			},
			select: this.answerQuestionResponseInterface
		})
	}

	private answerQuestionResponseInterface = {
		id: true,
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