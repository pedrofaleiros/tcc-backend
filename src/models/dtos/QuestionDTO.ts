import { QuestionEntity } from "../entities/QuestionEntity"

interface Params {
	image_url: string | null
	content: string
	level: number
}

class QuestionDTO {
	image_url: string | null
	content: string
	level: number

	constructor(params: Params) {
		this.image_url = params.image_url
		this.content = params.content
		this.level = params.level
	}

	toEntity(): QuestionEntity {
		return new QuestionEntity({
			id: null,
			image_url: this.image_url,
			content: this.content,
			level: this.level,
			alternatives: []
		})
	}

	static fromRequestBody(reqBody: any): QuestionDTO {
		if (!reqBody.content) throw new Error('Content is required')
		if (!reqBody.level) throw new Error('Level is required')

		return new QuestionDTO({
			content: reqBody.content,
			level: parseInt(reqBody.level),
			image_url: reqBody.image_url ? reqBody.image_url as string : null,
		});
	}
}

export { QuestionDTO }