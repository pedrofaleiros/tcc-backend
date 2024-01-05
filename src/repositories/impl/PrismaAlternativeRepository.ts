import { AlternativeEntity } from "../../models/entities/AlternativeEntity";
import { AlternativeResponse } from "../../models/response/AlternativeResponse";
import prismaClient from "../../prisma/PrismaClient";
import { AlternativeRepository } from "../AlternativeRepository";

class PrismaAlternativeRepository implements AlternativeRepository {

	async findAlternative(alternative_id: string): Promise<boolean> {
		const res = await prismaClient.alternative.findUnique({ where: { id: alternative_id } })
		return res != null
	}

	private async createAlternative(alternative: AlternativeEntity): Promise<void> {
		await prismaClient.alternative.create({
			data: {
				text: alternative.text,
				value: alternative.value,
				question_id: alternative.question_id,
			}
		})
	}

	async addAlternatives(alternatives: AlternativeEntity[]): Promise<void> {
		for (let i = 0; i < alternatives.length; i++) {
			await this.createAlternative(alternatives[i])
		}
	}
}

export { PrismaAlternativeRepository }