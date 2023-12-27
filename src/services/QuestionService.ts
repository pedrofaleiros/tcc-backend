import { QuestionDTO } from "../models/dtos/QuestionDTO"
import { QuestionResponse } from "../models/response/QuestionResponse"

interface QuestionService {
	createQuestion(question: QuestionDTO): Promise<string>
	deleteQuestion(question_id: string): Promise<string>
	listQuestionsByLevel(level: any): Promise<Array<QuestionResponse>>
}

export { QuestionService }