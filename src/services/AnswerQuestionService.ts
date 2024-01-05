import { AnswerQuestionDTO } from "../models/dtos/AnswerQuestionDTO"
import { AnswerQuestionResponse } from "../models/response/AnswerQuestionResponse"

interface AnswerQuestionService {
	answerQuestion(answer: AnswerQuestionDTO): Promise<boolean>

	listUserAnsweredQuestions(user_id: any): Promise<AnswerQuestionResponse[]>
	listUserAnsweredQuestionsByLevel(user_id: any, level: any): Promise<AnswerQuestionResponse[]>
	listUserAnsweredQuestionsByCategory(user_id: any, category_id: any): Promise<AnswerQuestionResponse[]>
}

export { AnswerQuestionService }

/* 
TODO:
	- Responder uma questao: 
		- valida se ja foi respondida
		- valida a resposta
		- retorna se acertou ou errou (true ou false), e infos da questao

	- Listar questoes respondidas pelo usuario
	
	- Listar questoes respondidas pelo usuario em algum nivel
	
	- Listar questoes respondidas pelo usuario de alguma categoria
*/