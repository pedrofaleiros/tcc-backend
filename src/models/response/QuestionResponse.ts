import { AlternativeResponse } from "./AlternativeResponse"

interface Params {
	id: string | null
	image_url: string | null
	content: string
	level: number
	alternatives: Array<AlternativeResponse> | null
	category_id: string | null
}

class QuestionResponse {
	id: string | null
	image_url: string | null
	content: string
	level: number
	alternatives: Array<AlternativeResponse>
	category_id: string | null

	constructor(params: Params) {
		this.id = params.id
		this.image_url = params.image_url
		this.content = params.content
		this.level = params.level
		this.alternatives = params.alternatives == null ? [] : params.alternatives
		this.category_id = params.category_id
	}
}

export { QuestionResponse }