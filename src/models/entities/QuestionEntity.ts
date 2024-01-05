
interface Params {
	id: string | null
	image_url: string | null
	content: string
	level: number
	category_id: string | null
}

class QuestionEntity {
	id: string | null
	image_url: string | null
	content: string
	level: number
	category_id: string | null

	constructor(params: Params) {
		this.id = params.id
		this.image_url = params.image_url
		this.content = params.content
		this.level = params.level
		this.category_id = params.category_id
	}
}

export { QuestionEntity }