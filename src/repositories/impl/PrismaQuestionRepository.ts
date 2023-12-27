import { QuestionEntity } from "../../models/entities/QuestionEntity";
import { QuestionResponse } from "../../models/response/QuestionResponse";
import { QuestionRepository } from "../QuestionRepository";
import prismaClient from "../../prisma/PrismaClient";

class PrismaQuestionRepository implements QuestionRepository {

	async createQuestion(question: QuestionEntity): Promise<string> {
		try {
			await prismaClient.question.create({
				data: {
					content: question.content,
					level: question.level,
					image_url: question.image_url
				}
			})
			return "created"
		} catch (error) {
			throw new Error("Error creating question");
		}
	}

	async deleteQuestion(question_id: string): Promise<string> {
		try {
			await prismaClient.question.delete({
				where: {
					id: question_id
				}
			})
			return "deleted"
		} catch (error) {
			throw new Error("Error deleting question");
		}
	}

	async listQuestionsByLevel(level: number): Promise<QuestionResponse[]> {
		//TODO: converter do prisma para QuestionResponse
		const response = await prismaClient.question.findMany({
			
			include: {
				alternatives: {
					select: {
						id: true,
						text: true,
						value: true
					}
				}
			}
		})
		console.log(response)
		return []
	}
}

export { PrismaQuestionRepository }