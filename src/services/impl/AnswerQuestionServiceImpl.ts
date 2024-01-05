import { AnswerQuestionDTO } from "../../models/dtos/AnswerQuestionDTO";
import { AnswerQuestionResponse } from "../../models/response/AnswerQuestionResponse";
import { AlternativeRepository } from "../../repositories/AlternativeRepository";
import { AnswerQuestionRepository } from "../../repositories/AnswerQuestionRepository";
import { QuestionRepository } from "../../repositories/QuestionRepository";
import { PrismaAlternativeRepository } from "../../repositories/impl/PrismaAlternativeRepository";
import { PrismaAnswerQuestionRepository } from "../../repositories/impl/PrismaAnswerQuestionRepository";
import { PrismaQuestionRepository } from "../../repositories/impl/PrismaQuestionRepository";
import { AnswerQuestionService } from "../AnswerQuestionService";

class AnswerQuestionServiceImpl implements AnswerQuestionService {

	private repository: AnswerQuestionRepository
	private questionRepo: QuestionRepository
	private alternativeRepo: AlternativeRepository

	constructor() {
		this.repository = new PrismaAnswerQuestionRepository()
		this.questionRepo = new PrismaQuestionRepository()
		this.alternativeRepo = new PrismaAlternativeRepository()
	}

	async answerQuestion(answer: AnswerQuestionDTO): Promise<boolean> {
		if (!await this.alternativeRepo.findAlternative(answer.alternative_id)) throw new Error("Alternativa invalida");

		const answerQuestion = await this.repository.getAnsweredQuestion(answer.user_id, answer.question_id)

		if (answerQuestion == null) {
			return await this.create(answer)
		}
		return await this.update(answer, answerQuestion)
	}

	private async create(answer: AnswerQuestionDTO): Promise<boolean> {
		const question = await this.questionRepo.findQuestionById(answer.question_id)
		if (question == null) throw new Error("Questao nao encontrada")

		const correct = await this.repository.answer(answer.alternative_id)

		await this.repository.create(answer.toEntity(null, correct, 1))

		return correct
	}

	private async update(answer: AnswerQuestionDTO, answered: AnswerQuestionResponse): Promise<boolean> {
		if (answered.correct) throw new Error("A questao ja foi respondida corretamente")

		const correct = await this.repository.answer(answer.alternative_id)
		const tries = answered.tries + 1

		await this.repository.update(answer.toEntity(answered.id, correct, tries))

		return correct
	}

	async listUserAnsweredQuestions(user_id: any): Promise<AnswerQuestionResponse[]> {
		if (user_id == null || user_id == undefined) throw new Error("Id invalido")

		const _user_id = user_id as string
		return await this.repository.listUserAnsweredQuestions(_user_id)
	}

	async listUserAnsweredQuestionsByLevel(user_id: any, level: any): Promise<AnswerQuestionResponse[]> {
		if (user_id == null || user_id == undefined) throw new Error("Id invalido")
		if (level == null || level == undefined) throw new Error("Nivel invalido")

		const _level = parseInt(level)
		const _user_id = user_id as string
		return await this.repository.listUserAnsweredQuestionsByLevel(_user_id, _level)
	}

	async listUserAnsweredQuestionsByCategory(user_id: any, category_id: any): Promise<AnswerQuestionResponse[]> {
		if (user_id == null || user_id == undefined) throw new Error("Id de usuario invalido")
		if (category_id == null || category_id == undefined) throw new Error("Id da categoria invalido")

		const _category_id = category_id as string
		const _user_id = user_id as string
		return await this.repository.listUserAnsweredQuestionsByCategory(_user_id, _category_id)
	}
}

export { AnswerQuestionServiceImpl }