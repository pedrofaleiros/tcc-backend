import { AlternativeResponse } from "./AlternativeResponse"

interface Params {
	id: string | null
	image_url: string | null
	content: string
	level: number
	alternatives: Array<AlternativeResponse> | null
}

class QuestionResponse {
	id: string | null
	image_url: string | null
	content: string
	level: number
	alternatives: Array<AlternativeResponse>

	constructor(params: Params) {
		this.id = params.id
		this.image_url = params.image_url
		this.content = params.content
		this.level = params.level
		this.alternatives = params.alternatives == null ? [] : params.alternatives
	}
}

export { QuestionResponse }