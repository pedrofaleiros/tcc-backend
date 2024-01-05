interface Params {
	id: string | null
	user_id: string
	question_id: string
	alternative_id: string
	correct: boolean
	tries: number
}

class AnswerQuestionEntity {
	id: string | null
	user_id: string
	question_id: string
	alternative_id: string
	correct: boolean
	tries: number

	constructor(params: Params) {
		this.id = params.id
		this.user_id = params.user_id
		this.question_id = params.question_id
		this.alternative_id = params.alternative_id
		this.correct = params.correct
		this.tries = params.tries
	}
}

export { AnswerQuestionEntity }
