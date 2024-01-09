import { AnswerEntity } from "../entities/AnswerEntity"

interface Params {
	userId: string
	questionId: string
	alternativeId: string
}

export class AnswerDTO {
	userId: string
	questionId: string
	alternativeId: string

	constructor(p: Params) {
		this.userId = p.userId
		this.questionId = p.questionId
		this.alternativeId = p.alternativeId
	}

	toEntity(correct: boolean, tries: number): AnswerEntity {
		return new AnswerEntity({
			userId: this.userId,
			questionId: this.questionId,
			alternativeId: this.alternativeId,
			correct: correct,
			tries: tries,
		})
	}

	static fromRequestBody(reqBody: any, userId: any): AnswerDTO {
		if (!userId) throw new Error("Request invalido. 'userId' necessario")
		if (!reqBody.questionId) throw new Error("Request invalido. 'questionId' necessario")
		if (!reqBody.alternativeId) throw new Error("Request invalido. 'alternativeId' necessario")

		return new AnswerDTO({
			userId: userId,
			questionId: reqBody.questionId,
			alternativeId: reqBody.alternativeId,
		});
	}
}