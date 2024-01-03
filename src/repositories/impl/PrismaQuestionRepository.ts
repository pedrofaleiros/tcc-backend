import { QuestionEntity } from "../../models/entities/QuestionEntity";
import { QuestionResponse } from "../../models/response/QuestionResponse";
import { QuestionRepository } from "../QuestionRepository";
import prismaClient from "../../prisma/PrismaClient";
import { AlternativeEntity } from "../../models/entities/AlternativeEntity";
import { PrismaAlternativeRepository } from "./PrismaAlternativeRepository";

class PrismaQuestionRepository extends PrismaAlternativeRepository implements QuestionRepository {

	async listQuestionsByCategory(category_id: string): Promise<QuestionResponse[]> {
		const response: QuestionResponse[] = await prismaClient.question.findMany({
			where: {
				category_id: category_id
			},
			select: {
				id: true,
				content: true,
				level: true,
				image_url: true,
				category_id: true,
				alternatives: {
					select: {
						id: true,
						text: true,
					}
				}
			}
		})

		return response
	}

	async findCategory(category_id: string): Promise<boolean> {
		return await prismaClient.category.findUnique({
			where: { id: category_id }
		}) != null
	}

	async createQuestion(question: QuestionEntity): Promise<string> {
		try {
			const created = await prismaClient.question.create({
				data: {
					content: question.content,
					level: question.level,
					image_url: question.image_url,
					category_id: question.category_id,
				},
				select: {
					id: true
				}
			})
			return created.id
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

	async findQuestionById(question_id: string): Promise<QuestionEntity | null> {
		const question: QuestionEntity | null = await prismaClient.question.findUnique({
			where: {
				id: question_id
			},
			select: {
				id: true,
				content: true,
				level: true,
				image_url: true,
				category_id: true,
			}
		})
		return question
	}

	async listQuestionsByLevel(level: number): Promise<QuestionResponse[]> {
		const response: QuestionResponse[] = await prismaClient.question.findMany({
			where: {
				level: level
			},
			select: {
				id: true,
				content: true,
				level: true,
				image_url: true,
				category_id: true,
				alternatives: {
					select: {
						id: true,
						text: true,
					}
				}
			}
		})

		return response
	}
}

export { PrismaQuestionRepository }