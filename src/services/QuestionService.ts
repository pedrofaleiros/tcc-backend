import { AlternativeDTO } from "../models/dtos/AlternativeDTO"
import { QuestionDTO } from "../models/dtos/QuestionDTO"
import { QuestionResponse } from "../models/response/QuestionResponse"

interface QuestionService {
	createQuestion(question: QuestionDTO): Promise<void>
	deleteQuestion(question_id: any): Promise<void>
	listQuestionsByLevel(level: any): Promise<Array<QuestionResponse>>
	listQuestionsByCategory(category_id: any): Promise<Array<QuestionResponse>>
}

export { QuestionService }