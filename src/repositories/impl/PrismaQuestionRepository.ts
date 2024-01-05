import { QuestionEntity } from "../../models/entities/QuestionEntity";
import { QuestionResponse } from "../../models/response/QuestionResponse";
import { QuestionRepository } from "../QuestionRepository";
import prismaClient from "../../prisma/PrismaClient";
import { PrismaAlternativeRepository } from "./PrismaAlternativeRepository";
import { AlternativeEntity } from "../../models/entities/AlternativeEntity";
import { AlternativeRepository } from "../AlternativeRepository";

class PrismaQuestionRepository implements QuestionRepository {
	private alternativeRepository: AlternativeRepository;

	constructor() {
		this.alternativeRepository = new PrismaAlternativeRepository()
	}

	async addAlternatives(alternatives: AlternativeEntity[]): Promise<void> {
		await this.alternativeRepository.addAlternatives(alternatives)
	}

	async createQuestion(question: QuestionEntity): Promise<string> {
		const res = await prismaClient.question.create({
			data: {
				content: question.content,
				level: question.level,
				category_id: question.category_id,
				image_url: question.image_url,
			},
			select: { id: true }
		})
		return res.id
	}

	async findQuestionById(question_id: string): Promise<QuestionResponse | null> {
		const res = await prismaClient.question.findUnique({
			where: { id: question_id },
			select: this.questionResponseInterface,
		})
		return res
	}

	async deleteQuestion(question_id: string): Promise<void> {
		await this.deleteAlternatives(question_id);
		await prismaClient.question.delete({ where: { id: question_id } })
	}

	private async deleteAlternatives(question_id: string): Promise<void> {
		await prismaClient.alternative.deleteMany({
			where: { question_id: question_id }
		})
	}

	async listQuestionsByLevel(level: number): Promise<QuestionResponse[]> {
		return await prismaClient.question.findMany({
			where: { level: level },
			select: this.questionResponseInterface,
		})
	}

	async listQuestionsByCategory(category_id: string): Promise<QuestionResponse[]> {
		return await prismaClient.question.findMany({
			where: { category_id: category_id },
			select: this.questionResponseInterface,
		})
	}

	async findCategory(category_id: string): Promise<boolean> {
		const res = await prismaClient.category.count({ where: { id: category_id } })
		return res > 0
	}

	private questionResponseInterface = {
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
}

export { PrismaQuestionRepository }