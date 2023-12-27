import { QuestionEntity } from "../models/entities/QuestionEntity"
import { QuestionResponse } from "../models/response/QuestionResponse"

interface QuestionRepository {
	createQuestion(question: QuestionEntity): Promise<string>
	deleteQuestion(question_id: string): Promise<string>
	listQuestionsByLevel(level: number): Promise<Array<QuestionResponse>>
}

export { QuestionRepository }