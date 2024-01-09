import { AlternativeEntity } from "../entities/AlternativeEntity"

interface Params {
	text: string
	value: boolean
}

class AlternativeDTO {
	text: string
	value: boolean

	constructor(params: Params) {
		this.text = params.text
		this.value = params.value
	}

	toEntity(question_id: string): AlternativeEntity {
		return new AlternativeEntity({
			id: null,
			text: this.text,
			value: this.value,
			question_id: question_id,
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
		if (reqBody.value == undefined || reqBody.value == null) {
			throw new Error('Value is required')
		}
		return new AlternativeDTO({
			text: reqBody.text,
			value: reqBody.value,
		});
	}
}

export { AlternativeDTO }