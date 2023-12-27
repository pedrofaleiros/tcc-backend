import { QuestionDTO } from "../../models/dtos/QuestionDTO";
import { QuestionResponse } from "../../models/response/QuestionResponse";
import { QuestionRepository } from "../../repositories/QuestionRepository";
import { PrismaQuestionRepository } from "../../repositories/impl/PrismaQuestionRepository";
import { QuestionService } from "../QuestionService";

class QuestionServiceImpl implements QuestionService {
	private repository: QuestionRepository

	constructor() {
		this.repository = new PrismaQuestionRepository()
	}

	async createQuestion(question: QuestionDTO): Promise<string> {
		//TODO: validate question

		const response = await this.repository.createQuestion(question.toEntity())
		return response
	}

	async deleteQuestion(question_id: string): Promise<string> {
		//TODO: validate question_id (existe?)

		const response = await this.repository.deleteQuestion(question_id)
		return response
	}

	async listQuestionsByLevel(level: any): Promise<QuestionResponse[]> {
		const numberLevel = parseInt(level)
		if (numberLevel <= 0 || numberLevel >= 10) throw new Error("Invalid level")

		const response = await this.repository.listQuestionsByLevel(numberLevel)
		return response
	}
}

export { QuestionServiceImpl }