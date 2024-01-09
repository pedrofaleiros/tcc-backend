import { AlternativeDTO } from "../dtos/AlternativeDTO"

interface Params {
	id: string | null
	text: string
	value: boolean
	question_id: string
}

class AlternativeEntity {
	id: string | null
	text: string
	value: boolean
	question_id: string

	constructor(params: Params) {
		this.id = params.id
		this.text = params.text
		this.value = params.value
		this.question_id = params.question_id
	}

	static fromListDTO(alternatives: AlternativeDTO[], questionId: string): AlternativeEntity[] {
		const entities: AlternativeEntity[] = []
		alternatives.forEach((alternative) => {
			entities.push(alternative.toEntity(questionId))
		})
		return entities
	}
}

export { AlternativeEntity }