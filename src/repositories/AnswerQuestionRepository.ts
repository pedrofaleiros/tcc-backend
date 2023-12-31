import { AnswerQuestionEntity } from "../models/entities/AnswerQuestionEntity";
import { AnswerQuestionResponse } from "../models/response/AnswerQuestionResponse";

interface AnswerQuestionRepository {
	answerQuestion(answerQuestion: AnswerQuestionEntity): Promise<AnswerQuestionResponse>
	listUserAnsweredQuestions(user_id: string): Promise<AnswerQuestionResponse[]>
	findAnsweredQuestion(user_id: string, question_id: string): Promise<AnswerQuestionResponse>
}

export { AnswerQuestionRepository }