import { AlternativeEntity } from "../../models/entities/AlternativeEntity";
import { AlternativeResponse } from "../../models/response/AlternativeResponse";
import prismaClient from "../../prisma/PrismaClient";
import { AlternativeRepository } from "../AlternativeRepository";

class PrismaAlternativeRepository implements AlternativeRepository {

	async questionHasTrueAlternative(question_id: string): Promise<boolean> {
		const response = await prismaClient.alternative.findFirst({
			where: {
				question_id: question_id,
				value: true
			}
		})
		return response != null
	}

	async getQuestionAlternatives(question_id: string): Promise<AlternativeResponse[]> {
		const response = await prismaClient.alternative.findMany({
			where: {
				question_id: question_id
			},
			select: {
				id: true,
				text: true,
				value: true,
			}
		})

		const alternatives: Array<AlternativeResponse> = []
		response.forEach((data) => {
			alternatives.push(new AlternativeResponse({
				id: data.id,
				text: data.text,
				value: data.value,
			}))
		})

		return alternatives
	}

	async createAlternative(alternative: AlternativeEntity): Promise<string> {
		try {
			await prismaClient.alternative.create({
				data: {
					text: alternative.text,
					value: alternative.value,
					question_id: alternative.question_id
				}
			})

			return "created"
		} catch (error) {
			throw new Error("Error creating alternative");
		}
	}
}

export { PrismaAlternativeRepository }