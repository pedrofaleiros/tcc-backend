
interface Params {
	id: string | null
	image_url: string | null
	content: string
	level: number
}

class QuestionEntity {
	id: string | null
	image_url: string | null
	content: string
	level: number

	constructor(params: Params) {
		this.id = params.id
		this.image_url = params.image_url
		this.content = params.content
		this.level = params.level
	}
}

export { QuestionEntity }