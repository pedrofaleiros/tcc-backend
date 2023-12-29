import { AnswerQuestionEntity } from "../models/entities/AnswerQuestionEntity";
import { AnswerQuestionResponse } from "../models/response/AnswerQuestionResponse";

interface AnswerQuestionRepository {
	answerQuestion(answerQuestion: AnswerQuestionEntity): Promise<string>
	listUserAnsweredQuestions(user_id: string): Promise<AnswerQuestionResponse[]>
}

export { AnswerQuestionRepository }