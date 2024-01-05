import { AlternativeEntity } from "../models/entities/AlternativeEntity"
import { QuestionEntity } from "../models/entities/QuestionEntity"
import { QuestionResponse } from "../models/response/QuestionResponse"

interface QuestionRepository {
	createQuestion(question: QuestionEntity): Promise<string>
	deleteQuestion(question_id: string): Promise<void>

	addAlternatives(alternatives: AlternativeEntity[]): Promise<void>

	findQuestionById(question_id: string): Promise<QuestionResponse | null>
	findCategory(category_id: string): Promise<boolean>

	listQuestionsByLevel(level: number): Promise<QuestionResponse[]>
	listQuestionsByCategory(category_id: string): Promise<QuestionResponse[]>
}

export { QuestionRepository }