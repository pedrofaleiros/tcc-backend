interface Params {
	userId: string
	questionId: string
	alternativeId: string
	tries: number
	correct: boolean
}

export class AnswerEntity {
	userId: string
	questionId: string
	alternativeId: string
	tries: number
	correct: boolean

	constructor(p: Params) {
		this.userId = p.userId
		this.questionId = p.questionId
		this.alternativeId = p.alternativeId
		this.correct = p.correct
		this.tries = p.tries
	}
}