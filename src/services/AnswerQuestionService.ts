import { AnswerQuestionDTO } from "../models/dtos/AnswerQuestionDTO"
import { AnswerQuestionResponse } from "../models/response/AnswerQuestionResponse"

interface AnswerQuestionService {
	answerQuestion(answerQuestion: AnswerQuestionDTO): Promise<AnswerQuestionResponse>
	listUserAnsweredQuestions(user_id: string): Promise<AnswerQuestionResponse[]>
}

export { AnswerQuestionService }