import { AnswerDTO } from "../models/dtos/AnswerDTO";
import { AnswerEntity } from "../models/entities/AnswerEntity";
import prismaClient from "../prisma/PrismaClient";

export class AnswerRepository {

	async answerQuestion(answer: AnswerEntity) {
		await prismaClient.userQuestion.create({
			data: {
				correct: answer.correct,
				tries: answer.tries,
				userId: answer.userId,
				questionId: answer.questionId,
				alternativeId: answer.alternativeId,
			}
		})
	}

	async answerAgainQuestion(answer: AnswerEntity, id: string) {
		await prismaClient.userQuestion.update({
			where: { id: id },
			data: {
				alternativeId: answer.alternativeId,
				tries: answer.tries,
				correct: answer.correct,
			}
		})
	}

	async findUserQuestion(userId: string, questionId: string) {
		return await prismaClient.userQuestion.findFirst({
			where: {
				userId: userId,
				questionId: questionId,
			}
		})
	}

	async findQuestion(questionId: string, alternativeId: string) {
		const question = await prismaClient.alternative.findUnique({
			where: {
				id: alternativeId,
				questionId: questionId,
			}
		})
		return question
	}

	async verifyAnswer(alternativeId: string) {
		const data = await prismaClient.alternative.findUnique({ where: { id: alternativeId } })
		if (data == null) return false
		return data.value
	}
}