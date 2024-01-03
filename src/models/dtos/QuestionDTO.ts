import { QuestionEntity } from "../entities/QuestionEntity"
import { AlternativeDTO } from "./AlternativeDTO"

interface Params {
	image_url: string | null
	content: string
	level: number
	alternatives: AlternativeDTO[]
	category_id: string | null
}

class QuestionDTO {
	image_url: string | null
	content: string
	level: number
	alternatives: AlternativeDTO[]
	category_id: string | null

	constructor(params: Params) {
		this.image_url = params.image_url
		this.content = params.content
		this.level = params.level
		this.alternatives = params.alternatives
		this.category_id = params.category_id
	}

	toEntity(): QuestionEntity {
		return new QuestionEntity({
			id: null,
			image_url: this.image_url,
			content: this.content,
			level: this.level,
			category_id: this.category_id,
		})
	}

	static fromRequestBody(reqBody: any): QuestionDTO {
		if (!reqBody.content) throw new Error('Content is required')
		if (!reqBody.level) throw new Error('Level is required')

		const alternatives: AlternativeDTO[] = []

		const list = reqBody.alternatives as Array<{ text: string, value: boolean }>
		list.forEach((e) => {
			let aux = new AlternativeDTO({
				text: e.text,
				value: e.value,
				question_id: null
			})
			alternatives.push(aux)
		})

		return new QuestionDTO({
			content: reqBody.content,
			level: parseInt(reqBody.level),
			image_url: reqBody.image_url ? reqBody.image_url as string : null,
			alternatives: alternatives,
			category_id: reqBody.category_id,
		});
	}
}

export { QuestionDTO }