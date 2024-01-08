import { AlternativeDTO } from "../../models/dtos/AlternativeDTO";
import { QuestionDTO } from "../../models/dtos/QuestionDTO";
import { AlternativeEntity } from "../../models/entities/AlternativeEntity";
import { QuestionResponse } from "../../models/response/QuestionResponse";
import { QuestionRepository } from "../../repositories/QuestionRepository";
import { PrismaQuestionRepository } from "../../repositories/impl/PrismaQuestionRepository";
import { QuestionService } from "../QuestionService";

class QuestionServiceImpl implements QuestionService {
	private repository: QuestionRepository

	constructor() {
		this.repository = new PrismaQuestionRepository()
	}

	async updateQuestionCategory(question_id: any, category_id: any): Promise<void> {
		if (question_id == null || question_id == undefined || question_id == "") throw new Error("Questao invalida");
		if (category_id == null || category_id == undefined || category_id == "") throw new Error("Categoria invalida");
		if (!await this.repository.findCategory(category_id)) throw new Error("Categoria invalida");

		await this.repository.updateQuestionCategory(question_id, category_id);
	}

	async listQuestions(category_id: any, level: any): Promise<QuestionResponse[]> {
		if (category_id == null || category_id == undefined) {
			if (level == undefined || level == null) {
				return await this.repository.listQuestions();
			} else {
				return await this.listQuestionsByLevel(level);
			}
		} else {
			return await this.listQuestionsByCategory(category_id);
		}
	}

	async listQuestionsByCategory(category_id: any): Promise<QuestionResponse[]> {
		if (category_id == null || category_id == undefined) throw new Error("Id invalido")

		const id = category_id as string
		if (!await this.repository.findCategory(id)) throw new Error("Categoria invalida")
		return await this.repository.listQuestionsByCategory(category_id)
	}

	async createQuestion(question: QuestionDTO): Promise<void> {
		if (question.content.length < 3 || question.content.length > 512) throw new Error("Conteudo deve ter entre 3 e 512 caracteres")
		if (question.level < 0 || question.level > 10) throw new Error("Nivel deve estar entre 1 e 10")
		if (question.category_id != null) {
			if (!await this.repository.findCategory(question.category_id || "")) throw new Error("Categoria invalida")
		}

		const createdQuestionId = await this.repository.createQuestion(question.toEntity())

		try {
			this.validateAlternatives(question.alternatives)
			await this.repository.addAlternatives(AlternativeEntity.fromListDTO(question.alternatives, createdQuestionId))
		} catch (error) {
			await this.deleteQuestion(createdQuestionId)
			throw error
		}
	}

	async deleteQuestion(question_id: any): Promise<void> {
		if (question_id == null || question_id == undefined) throw new Error("Id invalido");

		const id = question_id as string
		const question = await this.repository.findQuestionById(id)

		if (question == null) throw new Error("Questao nao encontrada");

		await this.repository.deleteQuestion(id)
	}

	async listQuestionsByLevel(level: any): Promise<QuestionResponse[]> {
		const numberLevel = parseInt(level)
		if (numberLevel <= 0 || numberLevel > 10) throw new Error("Nivel invalido")
		const response = await this.repository.listQuestionsByLevel(numberLevel)
		return response
	}

	private validateAlternatives(alternatives: AlternativeDTO[]): void {
		let trueCount = 0
		alternatives.forEach((alt) => {
			if (alt.text.length == 0 || alt.text == "" || alt.text.length > 100) {
				throw new Error("Alternativa deve conter entre 1 e 100 caracteres");
			}
			if (alt.value) trueCount++
		})
		if (trueCount != 1) throw new Error("Questao deve conter 1 alternativa correta");
		if (alternatives.length < 1 || alternatives.length > 5) throw new Error("Questao deve ter entre 1 e 5 alternativas");
	}
}

export { QuestionServiceImpl }