import { AlternativeDTO } from "../../models/dtos/AlternativeDTO";
import { AlternativeRepository } from "../../repositories/AlternativeRepository";
import { PrismaAlternativeRepository } from "../../repositories/impl/PrismaAlternativeRepository";
import { AlternativeService } from "../AlternativeService";

class AlternativeServiceImpl implements AlternativeService {
	private repository: AlternativeRepository

	constructor() {
		this.repository = new PrismaAlternativeRepository()
	}

	async createAlternative(alternative: AlternativeDTO): Promise<string> {
		//TODO: validate alternative

		const questionAlternatives = await this.repository.getQuestionAlternatives(alternative.question_id)
		if (questionAlternatives.length >= 5) throw new Error("Max of 5 alternatives")

		const hasTrueAlternative = await this.repository.questionHasTrueAlternative(alternative.question_id)

		if (alternative.value == true) {
			if (hasTrueAlternative) throw new Error("Questao ja possui uma alternativa correta");
		} else {
			if (questionAlternatives.length == 4 && !hasTrueAlternative) {
				throw new Error("Questao deve ter uma alternativa correta");
			}
		}

		const response = await this.repository.createAlternative(alternative.toEntity())
		return response
	}
}

export { AlternativeServiceImpl }