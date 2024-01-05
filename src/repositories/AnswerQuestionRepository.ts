import { AnswerQuestionEntity } from "../models/entities/AnswerQuestionEntity";
import { AnswerQuestionResponse } from "../models/response/AnswerQuestionResponse";

interface AnswerQuestionRepository {
	// answerQuestion(answerQuestion: AnswerQuestionEntity): Promise<AnswerQuestionResponse>
	// findAnsweredQuestion(user_id: string, question_id: string): Promise<AnswerQuestionResponse>

	create(answerQuestion: AnswerQuestionEntity): Promise<void>
	update(answerQuestion: AnswerQuestionEntity): Promise<void>

	answer(alternative_id: string): Promise<boolean>
	getAnsweredQuestion(user_id: string, question_id: string): Promise<AnswerQuestionResponse | null>

	listUserAnsweredQuestions(user_id: string): Promise<AnswerQuestionResponse[]>
	listUserAnsweredQuestionsByLevel(user_id: string, level: number): Promise<AnswerQuestionResponse[]>
	listUserAnsweredQuestionsByCategory(user_id: string, category_id: string): Promise<AnswerQuestionResponse[]>
}

export { AnswerQuestionRepository }

/* 
TODO:
	- criar

	- atualizar

	- retornar uma AnswerQuestion

	- Listar questoes respondidas pelo usuario
	
	- Listar questoes respondidas pelo usuario em algum nivel
	
	- Listar questoes respondidas pelo usuario de alguma categoria
*/