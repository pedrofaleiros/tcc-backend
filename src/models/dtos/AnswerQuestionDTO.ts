import { AnswerQuestionEntity } from "../entities/AnswerQuestionEntity"

interface Params {
	user_id: string
	question_id: string
	alternative_id: string
}

class AnswerQuestionDTO {
	user_id: string
	question_id: string
	alternative_id: string

	constructor(params: Params) {
		this.user_id = params.user_id
		this.question_id = params.question_id
		this.alternative_id = params.alternative_id
	}

	static fromRequestBody(reqBody: any, user_id: string) {
		if (!reqBody.question_id) throw new Error('question_id is required')
		if (!reqBody.alternative_id) throw new Error('alternative_id is required')

		return new AnswerQuestionDTO({
			user_id: user_id,
			question_id: reqBody.question_id,
			alternative_id: reqBody.alternative_id,
		});
	}

	toEntity(): AnswerQuestionEntity {
		return new AnswerQuestionEntity({
			user_id: this.user_id,
			question_id: this.question_id,
			alternative_id: this.alternative_id,
		})
	}
}

export { AnswerQuestionDTO }

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