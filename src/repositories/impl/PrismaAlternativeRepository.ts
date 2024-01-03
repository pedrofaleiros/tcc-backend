import { AlternativeEntity } from "../../models/entities/AlternativeEntity";
import { AlternativeResponse } from "../../models/response/AlternativeResponse";
import prismaClient from "../../prisma/PrismaClient";
import { AlternativeRepository } from "../AlternativeRepository";

class PrismaAlternativeRepository implements AlternativeRepository {

	async createAlternative(alternative: AlternativeEntity): Promise<void> {
		try {
			await prismaClient.alternative.create({
				data: {
					text: alternative.text,
					value: alternative.value,
					question_id: alternative.question_id
				}
			})
		} catch (error) {
			throw new Error("Erro inesperado ao criar alternativa");
		}
	}

	async addAlternatives(alternatives: AlternativeEntity[]): Promise<string> {
		try {
			for (let i = 0; i < alternatives.length; i++) {
				await this.createAlternative(alternatives[i])
			}
			return 'created'
		} catch (error) {
			throw new Error("Erro inesperado ao adicionar alternativa");
		}
	}
}

export { PrismaAlternativeRepository }