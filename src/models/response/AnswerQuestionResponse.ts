import { QuestionResponse } from "./QuestionResponse"

interface Params {
	id: string
	question: QuestionResponse
	alternative_id: string
	tries: number
	correct: boolean
}

class AnswerQuestionResponse {
	id: string
	question: QuestionResponse
	alternative_id: string
	tries: number
	correct: boolean

	constructor(params: Params) {
		this.id = params.id
		this.question = params.question
		this.alternative_id = params.alternative_id
		this.tries = params.tries
		this.correct = params.correct
	}
}

export { AnswerQuestionResponse }

/* 
model AnswerQuestion {
  id      String  @id @default(uuid())
  tries   Int
  correct Boolean

  user_id        String
  question_id    String
  alternative_id String
}
*/