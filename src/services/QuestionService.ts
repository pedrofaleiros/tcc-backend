import { AlternativeDTO } from "../models/dtos/AlternativeDTO"
import { QuestionDTO } from "../models/dtos/QuestionDTO"
import { QuestionResponse } from "../models/response/QuestionResponse"

interface QuestionService {
	createQuestion(question: QuestionDTO): Promise<string>
	deleteQuestion(question_id: string): Promise<string>
	listQuestionsByLevel(level: any): Promise<Array<QuestionResponse>>
	listQuestionsByCategory(category_id: string): Promise<Array<QuestionResponse>>
}

export { QuestionService }