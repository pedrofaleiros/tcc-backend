import { AlternativeEntity } from "../entities/AlternativeEntity"

interface Params {
	text: string
	value: boolean
	question_id: string | null
}

class AlternativeDTO {
	text: string
	value: boolean
	question_id: string | null

	constructor(params: Params) {
		this.text = params.text
		this.value = params.value
		this.question_id = params.question_id
	}

	toEntity(question_id: string): AlternativeEntity {
		return new AlternativeEntity({
			id: null,
			text: this.text,
			value: this.value,
			question_id: this.question_id ?? question_id,
		})
	}

	static listToEntity(alternatives: AlternativeDTO[], question_id: string): AlternativeEntity[] {
		const res: AlternativeEntity[] = []
		alternatives.forEach((alt) => {
			res.push(alt.toEntity(question_id))
		})
		return res
	}

	static fromRequestBody(reqBody: any): AlternativeDTO {
		if (!reqBody.text) throw new Error('Text is required')
		if (reqBody.value == undefined) throw new Error('Value is required')
		if (!reqBody.question_id) throw new Error('QuestionId is required')

		return new AlternativeDTO({
			text: reqBody.text,
			value: reqBody.value,
			question_id: reqBody.question_id,
		});
	}
}

export { AlternativeDTO }