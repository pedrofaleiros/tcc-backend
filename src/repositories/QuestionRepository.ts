import { AlternativeEntity } from "../models/entities/AlternativeEntity"
import { QuestionEntity } from "../models/entities/QuestionEntity"
import { QuestionResponse } from "../models/response/QuestionResponse"

interface QuestionRepository {
	createQuestion(question: QuestionEntity): Promise<string>
	addAlternatives(alternatives: AlternativeEntity[]): Promise<string>
	findQuestionById(question_id: string): Promise<QuestionEntity | null>
	deleteQuestion(question_id: string): Promise<string>
	listQuestionsByLevel(level: number): Promise<QuestionResponse[]>
}

export { QuestionRepository }