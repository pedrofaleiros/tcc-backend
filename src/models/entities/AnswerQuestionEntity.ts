interface Params {
	user_id: string
	question_id: string
	alternative_id: string
}

class AnswerQuestionEntity {
	user_id: string
	question_id: string
	alternative_id: string

	constructor(params: Params) {
		this.user_id = params.user_id
		this.question_id = params.question_id
		this.alternative_id = params.alternative_id
	}
}

export { AnswerQuestionEntity }

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